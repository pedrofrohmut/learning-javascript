import InstallmentsRepository from "../../application/repositories/installments-repository"
import Installment from "../../domain/entities/Installment"
import Connection from "../database/connection"

class InstallmentsDatabaseRepository implements InstallmentsRepository {
    constructor(private readonly connection: Connection) {}

    async save(installment: Installment): Promise<void> {
        await this.connection.query(
            `INSERT INTO installments (id, loan_code, number, amount, interest, amortization, balance) 
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
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

    async findByLoanCode(code: string): Promise<Installment[]> {
        const installmentsData = await this.connection.query("SELECT * FROM installments WHERE loan_code = $1", code)

        const installments: Installment[] = []

        if (installmentsData) {
            for (const installmentData of installmentsData) {
                const installment = new Installment(
                    installmentData.id,
                    installmentData.code,
                    parseInt(installmentData.number),
                    parseFloat(installmentData.amount),
                    parseFloat(installmentData.interest),
                    parseFloat(installmentData.amortization),
                    parseFloat(installmentData.balance)
                )
                installments.push(installment)
            }
        }

        return installments
    }
}

export default InstallmentsDatabaseRepository
