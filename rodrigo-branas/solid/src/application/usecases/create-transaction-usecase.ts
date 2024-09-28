import { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"

export type Input = {
    code: string
    value: number
    numberInstallments: number
    paymentMethod: string
}

class CreateTransactionUseCase {
    constructor() {}

    async execute(dbContext: any, input: Input): Promise<void> {
        await dbContext.query(
            `INSERT INTO transactions (id, code, value, number_installments, payment_method)
         VALUES ($1, $2, $3, $4, $5)`,
            [uuidv4(), input.code, input.value, input.numberInstallments, input.paymentMethod]
        )

        const addingInstallments = []
        const N = input.numberInstallments
        const total = input.value
        const portion = parseFloat((total / N).toFixed(2))
        const extraFromRounding = parseFloat((total - portion * N).toFixed(2))

        for (let i = 1; i <= N; i++) {
            const value = i == N ? portion + extraFromRounding : portion
            const addInstallment = dbContext.query(
                `INSERT INTO installments (id, number, value, transaction_code) VALUES ($1, $2, $3, $4)`,
                [uuidv4(), i, value, input.code]
            )
            addingInstallments.push(addInstallment)
        }

        await Promise.all(addingInstallments)
    }
}

export default CreateTransactionUseCase
