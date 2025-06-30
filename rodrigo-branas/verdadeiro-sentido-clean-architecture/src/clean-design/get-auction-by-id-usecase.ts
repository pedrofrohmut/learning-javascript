import AuctionRepository from "./auction-repository"
import BidRepository from "./bid-repository"

export type GetAuctionByIdInput = string

export type GetAuctionByIdOutput = {
    auctionId: string
    startDate: Date
    endDate: Date
    minIncrement: number
    startAmount: number
    highestBid: null | {
        bidId: string
        customer: string
        amount: number
        createdAt: Date
    }
}

class GetAuctionByIdUseCase {
    private readonly auctionRepository: AuctionRepository
    private readonly bidRepository: BidRepository

    constructor(auctionRepository: AuctionRepository, bidRepository: BidRepository) {
        this.auctionRepository = auctionRepository
        this.bidRepository = bidRepository
    }

    async execute(auctionId: GetAuctionByIdInput): Promise<GetAuctionByIdOutput> {
        let auctionDb = null
        try {
            const result = await this.auctionRepository.get(auctionId)
            auctionDb = result
        } catch (err: any) {
            console.error("Get Auction Error: " + err.message)
            throw new Error("Error trying to get a auction")
        }
        if (!auctionDb) {
            throw new Error("Auction not found")
        }

        let bidDb = null
        try {
            const result = await this.bidRepository.getHighestByAuctionId(auctionId)
            if (result) {
                bidDb = {
                    bidId: result.bid_id,
                    customer: result.customer,
                    amount: result.amount,
                    createdAt: result.created_at
                }
            }
        } catch (err: any) {
            console.error("Get Highest Bid Error: " + err.message)
            throw new Error("Error trying to get the highest bid")
        }

        return {
            auctionId,
            startDate: auctionDb.start_date,
            endDate: auctionDb.end_date,
            minIncrement: auctionDb.min_increment,
            startAmount: auctionDb.start_amount,
            highestBid: bidDb
        }
    }
}

export default GetAuctionByIdUseCase
