import Loan from "../../domain/entities/Loan"

interface LoansRepository {

    save(loan: Loan): Promise<void>

    findByCode(code: string): Promise<Optional<Loan>>

}

export default LoansRepository
