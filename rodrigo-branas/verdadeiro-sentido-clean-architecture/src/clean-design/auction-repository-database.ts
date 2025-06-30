import AuctionRepository from "./auction-repository"
import DatabaseConnection from "./database-connection"

// TODO: Make it singleton
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

    async save(auction: any): Promise<void> {
        await this.connection.query(
            `insert into auctions (auction_id, start_date, end_date, min_increment, start_amount)
             values ($1, $2, $3, $4, $5)`,
            [
                auction.auctionId,
                auction.startDate,
                auction.endDate,
                auction.minIncrement,
                auction.startAmount
            ]
        )
    }

    async get(auctionId: string): Promise<any> {
        const [auctionDb] = await this.connection.query(
            `select * from auctions where auction_id = $1`,
            [auctionId]
        )
        return auctionDb
    }
}

export default AuctionRepositoryDatabase
