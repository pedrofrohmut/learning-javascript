import { v4 as uuidv4 } from "uuid"

import Transaction from "../../domain/entity/transaction"
import ITransactionRepository from "../../domain/repositories/itransaction-repository"
import Installment from "../../domain/entity/installment"

class TransactionInMemoryRepository implements ITransactionRepository {
    private readonly transactions: Transaction[]

    constructor() {
        this.transactions = []
    }

    async save(transaction: Transaction): Promise<void> {
        this.transactions.push(transaction)
    }

    async get(code: string): Promise<Optional<Transaction>> {
        const foundTransaction = this.transactions.find(x => x.getCode() === code)
        if (!foundTransaction) {
            return null
        }
        return foundTransaction
    }
}

export default TransactionInMemoryRepository
