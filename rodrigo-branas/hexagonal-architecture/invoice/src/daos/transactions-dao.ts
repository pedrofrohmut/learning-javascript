import IConnection from "../application/iconnection"
import ITransactionsDao from "../application/itransactions-dao"

class TransactionsDao implements ITransactionsDao {

    private readonly connection: IConnection

    constructor(connection: IConnection) {
        this.connection = connection
    }

    async getTransactions(cardNumber: string, month: number, year: number): Promise<any> {
        return await this.connection.query(
            `select *
             from card_transactions
             where card_number = $1
             and extract(month from date) = $2
             and extract(year from date) = $3`,
            [cardNumber, month, year]
        )
    }
}

export default TransactionsDao
