import { v4 as uuidv4 } from "uuid"
import ITransactionRepository from "../../domain/repositories/itransaction-repository"
import Transaction from "../../domain/entity/transaction"

type Input = {
    code: string
    value: number
    numberInstallments: number
    paymentMethod: string
}

type Output = {}

class CreateTransactionUseCase {
    private static instance: CreateTransactionUseCase

    private readonly transactionRepository: ITransactionRepository

    private constructor(transactionRepository: ITransactionRepository) {
        this.transactionRepository = transactionRepository
    }

    static getInstance(transactionRepository: ITransactionRepository): CreateTransactionUseCase {
        if (!CreateTransactionUseCase.instance) {
            console.log("A new instance used for CreateTransactionUseCase")
            this.instance = new CreateTransactionUseCase(transactionRepository)
        } else {
            console.log("The same instance used for CreateTransactionUseCase")
        }
        return this.instance
    }

    async execute(input: Input): Promise<Output> {
        const transaction = new Transaction(
            uuidv4(),
            input.code,
            input.value,
            input.numberInstallments,
            input.paymentMethod,
            []
        )
        transaction.generateInstalments()
        await this.transactionRepository.save(transaction)
        return {}
    }
}

export { Input, Output }
export default CreateTransactionUseCase
