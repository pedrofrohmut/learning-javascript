import { DbContext } from "../main"
import ITransactionsDao from "./itransactions-dao"

class TransactionsDao implements ITransactionsDao {

    private readonly dbContext: DbContext

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    async getTransactions(cardNumber: string, month: number, year: number): Promise<any> {
        return await this.dbContext.query(
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
