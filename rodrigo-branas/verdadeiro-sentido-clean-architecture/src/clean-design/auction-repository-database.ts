import Auction from "./auction-entity"
import AuctionRepository from "./auction-repository"
import DatabaseConnection from "./database-connection"

class AuctionRepositoryDatabase implements AuctionRepository {
    private static instance: AuctionRepositoryDatabase

    private readonly connection: DatabaseConnection

    private constructor(connection: DatabaseConnection) {
        this.connection = connection
    }

    static getInstance(connection: DatabaseConnection) {
        if (!this.instance) {
            this.instance = new AuctionRepositoryDatabase(connection)
        }
        return this.instance
    }

    async save(auction: Auction): Promise<void> {
        await this.connection.query(
            `insert into auctions (auction_id, start_date, end_date, min_increment, start_amount)
             values ($1, $2, $3, $4, $5)`,
            [
                auction.getAuctionId(),
                auction.getStartDate(),
                auction.getEndDate(),
                auction.getMinIncrement(),
                auction.getStartAmount()
            ]
        )
    }

    async get(auctionId: string): Promise<Auction | null> {
        const [auctionDb] = await this.connection.query(`select * from auctions where auction_id = $1`, [auctionId])
        if (!auctionId) {
            return null
        }
        return new Auction(
            auctionDb.auction_id,
            auctionDb.start_date,
            auctionDb.end_date,
            auctionDb.min_increment,
            auctionDb.start_amount
        )
    }
}

export default AuctionRepositoryDatabase
