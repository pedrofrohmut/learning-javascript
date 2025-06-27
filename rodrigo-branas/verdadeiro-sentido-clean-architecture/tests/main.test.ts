import axios, { AxiosError } from "axios"
import WebSocket, { WebSocketServer } from "ws"

const BASE_URL = "http://localhost:5000"

let ws: WebSocket
const messages: any = []

beforeEach(async () => {
    ws = new WebSocket("ws://localhost:8080")
    ws.on("message", (data) => {
        // console.log(JSON.parse(data.toString()))
        messages.push(JSON.parse(data.toString()))
    })
})

afterEach(async () => {
    ws.close()
})

test("Should create an auction e give it 3 bids", async () => {
    // Create an auction
    const createAuctionInput = {
        startDate: "2025-03-01T10:00:00Z",
        endDate: "2025-03-01T12:00:00Z",
        minIncrement: 10,
        startAmount: 1000
    }
    const { data: createAuctionOutput } = await axios.post(
        `${BASE_URL}/auctions`,
        createAuctionInput
    )
    expect(createAuctionOutput.auctionId).toBeDefined()

    // Create 1st bid
    const bid1Input = {
        auctionId: createAuctionOutput.auctionId,
        customer: "a",
        amount: 1000,
        date: "2025-03-01T11:00:00Z"
    }
    const { data: createBid1Output } = await axios.post(`${BASE_URL}/bids`, bid1Input)
    expect(createBid1Output.bidId).toBeDefined()

    // Create 2nd bid
    const bid2Input = {
        auctionId: createAuctionOutput.auctionId,
        customer: "b",
        amount: 1010,
        date: "2025-03-01T11:00:00Z"
    }
    const { data: createBid2Output } = await axios.post(`${BASE_URL}/bids`, bid2Input)
    expect(createBid2Output.bidId).toBeDefined()

    // Create 3rd bid
    const bid3Input = {
        auctionId: createAuctionOutput.auctionId,
        customer: "c",
        amount: 1100,
        date: "2025-03-01T11:00:00Z"
    }
    const { data: createBid3Output } = await axios.post(`${BASE_URL}/bids`, bid3Input)
    expect(createBid3Output.bidId).toBeDefined()

    // Check for the highest bid
    const { data: auctionOutput } = await axios.get(
        `${BASE_URL}/auctions/${createAuctionOutput.auctionId}`
    )
    expect(auctionOutput.highestBid).not.toBeNull()
    expect(auctionOutput.highestBid.customer).toBe("c")
    expect(auctionOutput.highestBid.amount).toBe(1100)

    expect(messages).toHaveLength(3)
    expect(messages.at(0).customer).toBe("a")
    expect(messages.at(1).customer).toBe("b")
    expect(messages.at(2).customer).toBe("c")
})

test("Should not be possible to bid outside the auction time", async () => {
    // Create an auction
    const createAuctionInput = {
        startDate: "2025-03-01T10:00:00Z",
        endDate: "2025-03-01T12:00:00Z",
        minIncrement: 10,
        startAmount: 1000
    }
    const { data: createAuctionOutput } = await axios.post(
        `${BASE_URL}/auctions`,
        createAuctionInput
    )
    expect(createAuctionOutput.auctionId).toBeDefined()

    // Create late bid
    const lateBidInput = {
        auctionId: createAuctionOutput.auctionId,
        customer: "a",
        amount: 1000,
        date: "2025-03-01T14:00:00Z"
    }
    try {
        await axios.post(`${BASE_URL}/bids`, lateBidInput)
    } catch (err: any) {
        expect(err).toBeInstanceOf(AxiosError)
        expect(err.status).toBe(422)
        expect(err.response.data).toBe("Too late. Auction is already closed.")
    }

    // Create early bid
    const earlyBidInput = {
        auctionId: createAuctionOutput.auctionId,
        customer: "a",
        amount: 1000,
        date: "2025-03-01T08:00:00Z"
    }
    try {
        await axios.post(`${BASE_URL}/bids`, earlyBidInput)
    } catch (err: any) {
        expect(err).toBeInstanceOf(AxiosError)
        expect(err.status).toBe(422)
        expect(err.response.data).toBe("Too early. Auction is not opened yet.")
    }
})

test("The new bid must be bigger than the highest bid + minIncrement", async () => {
    // Create an auction
    const createAuctionInput = {
        startDate: "2025-03-01T10:00:00Z",
        endDate: "2025-03-01T12:00:00Z",
        minIncrement: 10,
        startAmount: 1000
    }
    const { data: createAuctionOutput } = await axios.post(
        `${BASE_URL}/auctions`,
        createAuctionInput
    )
    expect(createAuctionOutput.auctionId).toBeDefined()

    // Create 1st bid
    const firstBidInput = {
        auctionId: createAuctionOutput.auctionId,
        customer: "a",
        amount: 1000,
        date: "2025-03-01T11:00:00Z"
    }
    const { data: createFirstBidOutput } = await axios.post(`${BASE_URL}/bids`, firstBidInput)
    expect(createFirstBidOutput.bidId).toBeDefined()

    // Create 2nd bid - Same amount of highest
    const sameAmountBidInput = {
        auctionId: createAuctionOutput.auctionId,
        customer: "b",
        amount: 1000,
        date: "2025-03-01T11:00:00Z"
    }
    let sameAmountError: AxiosError | null = null
    try {
        await axios.post(`${BASE_URL}/bids`, sameAmountBidInput)
    } catch (err: any) {
        sameAmountError = err
    }
    expect(sameAmountError).not.toBeNull()
    if (sameAmountError) {
        expect(sameAmountError).toBeInstanceOf(AxiosError)
        expect(sameAmountError.status).toBe(400)
        expect(sameAmountError?.response?.data).toBe(
            "The bid amount is too low. Bid must be at least 1010."
        )
    }

    // Create 3rd bid - Amount smaller than highest + minIncrement
    const tooSmallAmountBidInput = {
        auctionId: createAuctionOutput.auctionId,
        customer: "c",
        amount: 900,
        date: "2025-03-01T11:00:00Z"
    }
    let tooSmallAmountError: AxiosError | null = null
    try {
        await axios.post(`${BASE_URL}/bids`, tooSmallAmountBidInput)
    } catch (err: any) {
        tooSmallAmountError = err
    }
    expect(tooSmallAmountError).not.toBeNull()
    if (tooSmallAmountError) {
        expect(tooSmallAmountError).toBeInstanceOf(AxiosError)
        expect(tooSmallAmountError.status).toBe(400)
        expect(tooSmallAmountError?.response?.data).toBe(
            "The bid amount is too low. Bid must be at least 1010."
        )
    }

    // Create 4th bid - Valid bid amount > (highestBid + minIncrement)
    const validBidInput = {
        auctionId: createAuctionOutput.auctionId,
        customer: "d",
        amount: firstBidInput.amount + createAuctionInput.minIncrement + 1,
        date: "2025-03-01T11:00:00Z"
    }
    const validBidResponse = await axios.post(`${BASE_URL}/bids`, validBidInput)
    expect(validBidResponse.status).toBe(200)
    expect(validBidResponse.data.bidId).toBeDefined()
})

test("Should not accept bids from the highest bid customer for the auction", async () => {
    // Create an auction
    const createAuctionInput = {
        startDate: "2025-03-01T10:00:00Z",
        endDate: "2025-03-01T12:00:00Z",
        minIncrement: 10,
        startAmount: 1000
    }
    const { data: createAuctionOutput } = await axios.post(
        `${BASE_URL}/auctions`,
        createAuctionInput
    )
    expect(createAuctionOutput.auctionId).toBeDefined()

    // Create 1st bid
    const firstBidInput = {
        auctionId: createAuctionOutput.auctionId,
        customer: "a",
        amount: 1000,
        date: "2025-03-01T11:00:00Z"
    }
    const { data: createFirstBidOutput } = await axios.post(`${BASE_URL}/bids`, firstBidInput)
    expect(createFirstBidOutput.bidId).toBeDefined()

    // Create 2nd bid - valid amount but the same customer
    const secondBidInput = {
        auctionId: createAuctionOutput.auctionId,
        customer: "a",
        amount: firstBidInput.amount + createAuctionInput.minIncrement + 1,
        date: "2025-03-01T11:00:00Z"
    }
    let invalidCustomerError: AxiosError | null = null
    try {
        await axios.post(`${BASE_URL}/bids`, secondBidInput)
    } catch (err: any) {
        invalidCustomerError = err
    }
    expect(invalidCustomerError).not.toBeNull()
    if (invalidCustomerError) {
        expect(invalidCustomerError).toBeInstanceOf(AxiosError)
        expect(invalidCustomerError.status).toBe(400)
        expect(invalidCustomerError.response?.data).toBe(
            "Invalid customer. The highest bid customer cannot place new bids."
        )
    }
})
