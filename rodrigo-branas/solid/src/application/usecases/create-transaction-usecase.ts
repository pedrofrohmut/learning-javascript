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

    async execute(dbContext: any, input: Input): Promise<void> {
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


        //await dbContext.query(
        //    `INSERT INTO transactions (id, code, value, number_installments, payment_method)
        //    VALUES ($1, $2, $3, $4, $5)`,
        //    [uuidv4(), input.code, input.value, input.numberInstallments, input.paymentMethod]
        //)

        //const addInstallment = dbContext.query(
        //    `INSERT INTO installments (id, number, value, transaction_code) VALUES ($1, $2, $3, $4)`,
        //    [uuidv4(), i, value, input.code]
        //)
    }
}

export default CreateTransactionUseCase
