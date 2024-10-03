import { v4 as uuidv4 } from "uuid"

import Transaction from "../../domain/entity/transaction"
import ITransactionRepository from "../../domain/repositories/itransaction-repository"
import Installment from "../../domain/entity/installment"
import InstallmentDbDto from "../../dtos/installment-db-dto"
import TransactionDbDto from "../../dtos/transaction-db-dto"

class TransactionDatabaseRepository implements ITransactionRepository {
    private readonly connection: any

    constructor(connection: any) {
        this.connection = connection
    }

    async save(transaction: Transaction): Promise<void> {
        await this.connection.query(
            `INSERT INTO transactions (id, code, value, number_installments, payment_method)
            VALUES ($1, $2, $3, $4, $5)`,
            [
                uuidv4(),
                transaction.getCode(),
                transaction.getValue(),
                transaction.getNumberInstallments(),
                transaction.getPaymentMethod()
            ]
        )

        const installmentsPromises = []
        for (const installment of transaction.getInstallments()) {
            const addInstallmentPromise = this.connection.query(
                `INSERT INTO installments (id, number, value, transaction_code) VALUES ($1, $2, $3, $4)`,
                [uuidv4(), installment.getNumber(), installment.getValue(), transaction.getCode()]
            )
            installmentsPromises.push(addInstallmentPromise)
        }
        await Promise.all(installmentsPromises)
    }

    async get(code: string): Promise<Optional<Transaction>> {
        const rows: TransactionDbDto[] = await this.connection.query(
            "SELECT id, value, number_installments, payment_method FROM transactions WHERE code = $1",
            [code]
        )

        if (rows.length < 1) {
            return null
        }

        const transaction = new Transaction(
            rows[0].id,
            code,
            Number(rows[0].value),
            Number(rows[0].number_installments),
            rows[0].payment_method,
            []
        )

        const installmentsRows: InstallmentDbDto[] = await this.connection.query(
            "SELECT id, number, value FROM installments WHERE transaction_code = $1",
            [code]
        )

        for (const row of installmentsRows) {
            transaction.getInstallments().push(new Installment(row.id, Number(row.number), Number(row.value)))
        }

        return transaction
    }
}

export default TransactionDatabaseRepository
