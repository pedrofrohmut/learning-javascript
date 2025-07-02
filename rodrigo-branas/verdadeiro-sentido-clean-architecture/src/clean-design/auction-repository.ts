import Auction from "./auction-entity"

interface AuctionRepository {
    save(auction: Auction): Promise<void>
    get(auctionId: string): Promise<Auction | null>
}

export default AuctionRepository
