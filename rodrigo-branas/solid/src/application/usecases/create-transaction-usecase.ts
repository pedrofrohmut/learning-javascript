import { v4 as uuidv4 } from "uuid"
import ITransactionRepository from "../../domain/repositories/itransaction-repository"
import Transaction from "../../domain/entity/transaction"

export type Input = {
    code: string
    value: number
    numberInstallments: number
    paymentMethod: string
}

class CreateTransactionUseCase {
    private readonly transactionRepository: ITransactionRepository

    constructor(transactionRepository: ITransactionRepository) {
        this.transactionRepository = transactionRepository
    }

    async execute(input: Input): Promise<void> {
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
    }
}

export default CreateTransactionUseCase
