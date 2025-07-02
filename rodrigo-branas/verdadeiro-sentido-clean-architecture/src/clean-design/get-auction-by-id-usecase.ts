import Auction from "./auction-entity"
import AuctionRepository from "./auction-repository"
import BidRepository from "./bid-repository"

export type GetAuctionByIdInput = { auctionId: string }

export type GetAuctionByIdOutput = Auction

class GetAuctionByIdUseCase {
    private readonly auctionRepository: AuctionRepository
    private readonly bidRepository: BidRepository

    constructor(auctionRepository: AuctionRepository, bidRepository: BidRepository) {
        this.auctionRepository = auctionRepository
        this.bidRepository = bidRepository
    }

    async execute({ auctionId }: GetAuctionByIdInput): Promise<GetAuctionByIdOutput> {
        let auctionDb = null
        try {
            auctionDb = await this.auctionRepository.get(auctionId)
        } catch (err: any) {
            console.error("Get Auction Error: " + err.message)
            throw new Error("Error trying to get a auction")
        }
        if (auctionDb === null) {
            throw new Error("Auction not found")
        }

        let highestBidDb = null
        try {
            highestBidDb = await this.bidRepository.getHighestByAuctionId(auctionId)
        } catch (err: any) {
            console.error("Get Highest Bid Error: " + err.message)
            throw new Error("Error trying to get the highest bid")
        }
        auctionDb.setHighestBid(highestBidDb)

        return auctionDb
    }
}

export default GetAuctionByIdUseCase
