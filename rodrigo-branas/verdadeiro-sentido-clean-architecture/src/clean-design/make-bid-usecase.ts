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
        const auction = await this.auctionRepository.get(input.auctionId)
        if (!auction) {
            throw new Error("Auction not found")
        }

        // Validate new bid
        const highestBid = await this.bidRepository.getHighestByAuctionId(auction.getAuctionId())
        auction.setHighestBid(highestBid)
        const newBid = new Bid(crypto.randomUUID(), input.auctionId, input.customer, input.amount, input.date)
        auction.validateNewBid(newBid)

        // Insert new bid
        try {
            await this.bidRepository.save(newBid)
        } catch (err: any) {
            console.error("Create Bid Error: " + err.message)
            throw new Error("Error trying to create a new bid")
        }

        for (const wsConnection of wsConnections) {
            wsConnection.send(Buffer.from(JSON.stringify(newBid)))
        }

        return { bidId: newBid.getBidId() }
    }
}

export default MakeBidUseCase
