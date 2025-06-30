import BidRepository from "./bid-repository"
import DatabaseConnection from "./database-connection"

// TODO: Make it singleton
class BidRepositoryDatabase implements BidRepository {
    private readonly connection: DatabaseConnection

    constructor(connection: DatabaseConnection) {
        this.connection = connection
    }

    async save(bid: any): Promise<void> {
        await this.connection.query(
            `insert into bids (bid_id, auction_id, customer, amount, created_at)
             values ($1, $2, $3, $4, $5)`,
            [bid.bidId, bid.auctionId, bid.customer, bid.amount, bid.date]
        )
    }

    async getHighestByAuctionId(auctionId: string): Promise<any> {
        const [highestBid] = await this.connection.query(
            `select * from bids where auction_id = $1 order by amount desc limit 1`,
            [auctionId]
        )
        return highestBid
    }
}

export default BidRepositoryDatabase
