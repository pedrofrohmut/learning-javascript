import ITransactionRepository from "../../domain/repositories/itransaction-repository"
import InstallmentDbDto from "../../dtos/installment-db-dto"
import InstallmentDto from "../../dtos/installment-dto"
import TransactionDbDto from "../../dtos/transaction-db-dto"
import TransactionDto from "../../dtos/transaction-dto"

export type Input = {
    code: string
}

export type Output = TransactionDto

class GetTransactionByCodeUseCase {
    private readonly transactionRepository: ITransactionRepository

    constructor(transactionRepository: ITransactionRepository) {
        this.transactionRepository = transactionRepository
    }

    async execute(dbContext: any, input: Input): Promise<Output> {
        const rows = await dbContext.query(
            "SELECT id, value, number_installments, payment_method, created_at FROM transactions WHERE code = $1",
            [input.code]
        )

        if (rows.length < 1) {
            throw new Error("No transaction found")
        }

        const installmentsRows = await dbContext.query(
            "SELECT id, number, value FROM installments WHERE transaction_code = $1",
            [input.code]
        )
        const installments: InstallmentDbDto[] = []
        for (let i = 0; i < installmentsRows.length; i++) {
            const installment = new InstallmentDto()
            installment.id = installmentsRows[i].id
            installment.value = parseFloat(installmentsRows[i].value)
            installment.number = parseInt(installmentsRows[i].number)
            installments.push(installment)
        }

        const transaction: TransactionDbDto = rows[0]
        return {
            id: transaction.id,
            code: input.code,
            value: transaction.value,
            numberInstallments: transaction.number_installments,
            paymentMethod: transaction.payment_method,
            createdAt: transaction.created_at,
            installments
        }
    }
}

export default GetTransactionByCodeUseCase
