import Installment from "../../types/Installment"
import Transaction from "../../types/Transaction"

export type Input = {
    code: string
}

export type Output = Transaction

class GetTransactionByCodeUseCase {
    constructor() {}

    async execute(dbContext: any, input: Input): Promise<Output> {
        const rows = await dbContext.query(
            "SELECT id, code, value, number_installments, payment_method, created_at FROM transactions WHERE code = $1",
            [input.code]
        )

        if (rows.length < 1) {
            throw new Error("No transaction found")
        }

        const installmentsRows = await dbContext.query(
            "SELECT id, number, value, transaction_code FROM installments WHERE transaction_code = $1",
            [input.code]
        )
        const installments: Installment[] = []
        for (let i = 0; i < installmentsRows.length; i++) {
            const x = installmentsRows[i]
            installments.push({
                id: x.id,
                value: parseFloat(x.value),
                number: parseInt(x.number)
            } as Installment)
        }

        const transaction = rows[0]
        return {
            id: transaction.id,
            code: transaction.code,
            value: transaction.value,
            numberInstallments: transaction.number_installments,
            paymentMethod: transaction.payment_method,
            createdAt: transaction.created_at,
            installments
        }
    }
}

export default GetTransactionByCodeUseCase
