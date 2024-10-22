import Loan from "../../domain/entities/Loan"
import Connection from "../database/connection"

class LoanDatabaseRepository {
    constructor(private readonly connection: Connection) { }

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

    async findByCode(code: string): Promise<any> {
        return await this.connection.query("SELECT * FROM loans WHERE code = $1", [code])
    }
 }

export default LoanDatabaseRepository
