import AuctionRepository from "./auction-repository"
import BidRepository from "./bid-repository"

export type MakeBidInput = {
    bidId: string
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

    async execute(bid: MakeBidInput, connections: any[]): Promise<MakeBidOutput> {
        // Check auction exists
        const auctionDb = await this.auctionRepository.get(bid.auctionId)
        if (!auctionDb) {
            throw new Error("Auction not found")
        }

        // Get highest bid
        const highestBid = await this.bidRepository.getHighestByAuctionId(auctionDb.auction_id)

        // Validate bid customer
        if (highestBid && bid.customer === highestBid.customer) {
            throw new Error("Invalid customer. The highest bid customer cannot place new bids.")
        }

        // Validate bid amount
        let validBidAmount = 0
        if (highestBid) {
            validBidAmount = highestBid.amount + auctionDb.min_increment
        } else {
            validBidAmount = auctionDb.start_amount
        }
        if (bid.amount < validBidAmount) {
            throw new Error("The bid amount is too low. Bid must be at least 1010.")
        }

        // Validate bid date
        const bidDate = new Date(bid.date).getTime()
        const startDate = new Date(auctionDb.start_date).getTime()
        const endDate = new Date(auctionDb.end_date).getTime()
        if (bidDate < startDate) {
            throw new Error("Too early. Auction is not opened yet.")
        }
        if (bidDate >= endDate) {
            throw new Error("Too late. Auction is already closed.")
        }

        // Insert new bid
        bid.bidId = crypto.randomUUID()
        try {
            await this.bidRepository.save(bid)
        } catch (err: any) {
            console.error("Create Bid Error: " + err.message)
            throw new Error("Error trying to create a new bid")
        }

        for (const connection of connections) {
            connection.send(Buffer.from(JSON.stringify(bid)))
        }

        return { bidId: bid.bidId }
    }
}

export default MakeBidUseCase
