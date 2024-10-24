import LoansRepository from "../../../application/repositories/loans-repository"
import Loan from "../../../domain/entities/Loan"
import Connection from "../../database/connection"

class LoansDatabaseRepository implements LoansRepository {
    constructor(private readonly connection: Connection) {}

    async save(loan: Loan): Promise<void> {
        const loansStm = `INSERT INTO loans (id, code, amount, period, rate, type) VALUES ($1, $2, $3, $4, $5, $6)`
        await this.connection.query(loansStm, [
            loan.getId(),
            loan.getCode(),
            loan.getAmount(),
            loan.getPeriod(),
            loan.getRate(),
            loan.getType()
        ])
    }

    async findByCode(code: string): Promise<Optional<Loan>> {
        const loanData = await this.connection.query("SELECT * FROM loans WHERE code = $1", [code])
        if (!loanData) {
            return null
        }
        return new Loan(
            loanData.id,
            loanData.code,
            parseFloat(loanData.amount),
            parseInt(loanData.period),
            parseInt(loanData.rate),
            loanData.type
        )
    }
}

export default LoansDatabaseRepository
