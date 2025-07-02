import Bid from "./bid-entity"

interface BidRepository {
    save(bid: Bid): Promise<void>
    getHighestByAuctionId(auctionId: string): Promise<Bid | null>
}

export default BidRepository
