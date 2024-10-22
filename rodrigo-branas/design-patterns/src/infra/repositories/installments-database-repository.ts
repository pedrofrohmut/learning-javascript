import Installment from "../../domain/entities/Installment"
import Connection from "../database/connection"

class InstallmentDatabaseRepository {
    constructor(private readonly connection: Connection) {}

    async save(installment: Installment): Promise<void> {
        await this.connection.query(
            `INSERT INTO installments  (id, loan_code, number, amount, interest, amortization, 
            balance) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
                crypto.randomUUID(),
                installment.getLoanCode(),
                installment.getNumber(),
                installment.getAmount(),
                installment.getInterest(),
                installment.getAmortization(),
                installment.getBalance()
            ]
        )
    }

    async findByLoanCode(code: string): Promise<any> {
        return await this.connection.query("SELECT * FROM installments WHERE loan_code = $1", code)
    }
}

export default InstallmentDatabaseRepository
