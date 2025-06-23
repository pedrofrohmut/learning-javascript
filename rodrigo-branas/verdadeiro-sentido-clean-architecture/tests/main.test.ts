import axios from "axios"

const BASE_URL = "http://localhost:5000"

test("Should create an auction e give it 3 bids", async () => {
    // Create an auction
    const createAuctionInput = {
        startDate: "2025-03-01T10:00:00Z",
        endDate: "2025-03-01T12:00:00Z",
        minIncrement: 10,
        startAmount: 1000
    }
    const { data: createAuctionOutput } = await axios.post(`${BASE_URL}/auctions`, createAuctionInput)
    expect(createAuctionOutput.auctionId).toBeDefined()

    // Create 1st bid
    const bid1Input = {
        auctionId: createAuctionOutput.auctionId,
        customer: "a",
        amount: 1000,
        date: "2025-03-11T11:00:00Z"
    }
    const { data: createBid1Output } = await axios.post(`${BASE_URL}/bids`, bid1Input)
    expect(createBid1Output.bidId).toBeDefined()

    // Create 2nd bid
    const bid2Input = {
        auctionId: createAuctionOutput.auctionId,
        customer: "b",
        amount: 1010,
        date: "2025-03-11T11:00:00Z"
    }
    const { data: createBid2Output } = await axios.post(`${BASE_URL}/bids`, bid2Input)
    expect(createBid2Output.bidId).toBeDefined()

    // Create 3rd bid
    const bid3Input = {
        auctionId: createAuctionOutput.auctionId,
        customer: "c",
        amount: 1100,
        date: "2025-03-11T11:00:00Z"
    }
    const { data: createBid3Output } = await axios.post(`${BASE_URL}/bids`, bid3Input)
    expect(createBid3Output.bidId).toBeDefined()

    // Check for the highest bid
    const { data: auctionOutput } = await axios.get(`${BASE_URL}/auctions/${createAuctionOutput.auctionId}`)
    expect(auctionOutput.highestBid).not.toBeNull()
    expect(auctionOutput.highestBid.customer).toBe("c")
    expect(auctionOutput.highestBid.amount).toBe(1100)

})
