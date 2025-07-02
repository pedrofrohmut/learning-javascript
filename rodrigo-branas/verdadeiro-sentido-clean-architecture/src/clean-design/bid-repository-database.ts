import Bid from "./bid-entity"
import BidRepository from "./bid-repository"
import DatabaseConnection from "./database-connection"

class BidRepositoryDatabase implements BidRepository {
    private static instance: BidRepositoryDatabase

    private readonly connection: DatabaseConnection

    private constructor(connection: DatabaseConnection) {
        this.connection = connection
    }

    static getInstance(connection: DatabaseConnection) {
        if (!this.instance) {
            this.instance = new BidRepositoryDatabase(connection)
        }
        return this.instance
    }

    async save(bid: Bid): Promise<void> {
        await this.connection.query(
            `insert into bids (bid_id, auction_id, customer, amount, created_at)
             values ($1, $2, $3, $4, $5)`,
            [bid.getBidId(), bid.getAuctionId(), bid.getCustomer(), bid.getAmount(), bid.getDate()]
        )
    }

    async getHighestByAuctionId(auctionId: string): Promise<Bid | null> {
        const [highestBidDb] = await this.connection.query(
            `select * from bids where auction_id = $1 order by amount desc limit 1`,
            [auctionId]
        )
        if (!highestBidDb) {
            return null
        }
        return new Bid(
            highestBidDb.bid_id,
            highestBidDb.auction_id,
            highestBidDb.customer,
            highestBidDb.amount,
            highestBidDb.date
        )
    }
}

export default BidRepositoryDatabase
