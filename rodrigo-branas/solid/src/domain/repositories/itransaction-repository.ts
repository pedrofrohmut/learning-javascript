import Transaction from "../entity/transaction"

interface ITransactionRepository {
    save(transaction: Transaction): Promise<void>
    get(code: string): Promise<Transaction>
}

export default ITransactionRepository
