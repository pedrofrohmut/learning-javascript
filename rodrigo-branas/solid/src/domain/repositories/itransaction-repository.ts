import Transaction from "../entity/transaction"

interface ITransactionRepository {
    save(transaction: Transaction): Promise<void>
    get(code: string): Promise<Optional<Transaction>>
}

export default ITransactionRepository
