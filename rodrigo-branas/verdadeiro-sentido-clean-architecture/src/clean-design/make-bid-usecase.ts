import AuctionRepository from "./auction-repository"
import Bid from "./bid-entity"
import BidRepository from "./bid-repository"

export type MakeBidInput = {
    auctionId: string
    customer: string
    amount: number
    date: Date
}

export type MakeBidOutput = { bidId: string }

class MakeBidUseCase {
    private readonly auctionRepository: AuctionRepository
    private readonly bidRepository: BidRepository

    constructor(auctionRepository: AuctionRepository, bidRepository: BidRepository) {
        this.auctionRepository = auctionRepository
        this.bidRepository = bidRepository
    }

    async execute(input: MakeBidInput, wsConnections: any[]): Promise<MakeBidOutput> {
        // Check auction exists
        const auctionDb = await this.auctionRepository.get(input.auctionId)
        if (!auctionDb) {
            throw new Error("Auction not found")
        }

        // Get highest bid
        const highestBid = await this.bidRepository.getHighestByAuctionId(auctionDb.getAuctionId())

        // Validate bid customer
        if (highestBid && input.customer === highestBid.getCustomer()) {
            throw new Error("Invalid customer. The highest bid customer cannot place new bids.")
        }

        // Validate bid amount
        let validBidAmount = 0
        if (highestBid) {
            validBidAmount = highestBid.getAmount() + auctionDb.getMinIncrement()
        } else {
            validBidAmount = auctionDb.getStartAmount()
        }
        if (input.amount < validBidAmount) {
            throw new Error("The bid amount is too low. Bid must be at least 1010.")
        }

        // Validate bid date
        const bidDate = new Date(input.date).getTime()
        const startDate = new Date(auctionDb.getStartDate()).getTime()
        const endDate = new Date(auctionDb.getEndDate()).getTime()
        if (bidDate < startDate) {
            throw new Error("Too early. Auction is not opened yet.")
        }
        if (bidDate >= endDate) {
            throw new Error("Too late. Auction is already closed.")
        }

        // Insert new bid
        const bid = new Bid(crypto.randomUUID(), input.auctionId, input.customer, input.amount, input.date)
        try {
            await this.bidRepository.save(bid)
        } catch (err: any) {
            console.error("Create Bid Error: " + err.message)
            throw new Error("Error trying to create a new bid")
        }

        for (const wsConnection of wsConnections) {
            wsConnection.send(Buffer.from(JSON.stringify(bid)))
        }

        return { bidId: bid.getBidId() }
    }
}

export default MakeBidUseCase
