import Transaction from "../../domain/entity/transaction"
import ITransactionRepository from "../../domain/repositories/itransaction-repository"

type Input = { code: string }

type Output = { transaction: Transaction }

class GetTransactionByCodeUseCase {
    private static instance: GetTransactionByCodeUseCase

    private readonly transactionRepository: ITransactionRepository

    private constructor(transactionRepository: ITransactionRepository) {
        this.transactionRepository = transactionRepository
    }

    static getInstance(transactionRepository: ITransactionRepository): GetTransactionByCodeUseCase {
        if (!GetTransactionByCodeUseCase.instance) {
            console.log("A new instance used for GetTransactionByCodeUseCase")
            this.instance = new GetTransactionByCodeUseCase(transactionRepository)
        } else {
            console.log("The same instance used for GetTransactionByCodeUseCase")
        }
        return this.instance
    }

    async execute(input: Input): Promise<Output> {
        const transaction = await this.transactionRepository.get(input.code)
        if (transaction == null) {
            throw new Error("No transaction found")
        }
        return { transaction }
    }
}

export { Input, Output }
export default GetTransactionByCodeUseCase
