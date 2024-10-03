import Transaction from "../../domain/entity/transaction"
import ITransactionRepository from "../../domain/repositories/itransaction-repository"

export type Input = { code: string }

export type Output = { transaction: Transaction }

class GetTransactionByCodeUseCase {
    private readonly transactionRepository: ITransactionRepository

    constructor(transactionRepository: ITransactionRepository) {
        this.transactionRepository = transactionRepository
    }

    async execute(input: Input): Promise<Output> {
        const transaction = await this.transactionRepository.get(input.code)
        if (transaction == null) {
            throw new Error("No transaction found")
        }
        return { transaction }
    }
}

export default GetTransactionByCodeUseCase
