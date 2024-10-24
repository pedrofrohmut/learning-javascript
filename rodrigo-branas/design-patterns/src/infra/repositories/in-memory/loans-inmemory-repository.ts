import LoansRepository from "../../../application/repositories/loans-repository"
import Loan from "../../../domain/entities/Loan"

class LoansInMemoryRepository implements LoansRepository {
    private readonly loans: Loan[]

    constructor() {
        this.loans = []
    }

    async save(loan: Loan): Promise<void> {
        this.loans.push(loan)
    }

    async findByCode(code: string): Promise<Optional<Loan>> {
        const loan = this.loans.find((x) => x.getCode() === code)
        return loan ? loan : null
    }
}

export default LoansInMemoryRepository
