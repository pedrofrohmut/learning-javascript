import LoanDatabaseRepository from "../../infra/repositories/loans-database-repository"
import InstallmentsDatabaseRepository from "../../infra/repositories/installments-database-repository"
import Installment from "../../domain/entities/Installment"

type Input = {
    code: string
}

type Output = {
    id: string
    code: string
    amount: number
    period: number
    rate: number
    type: string
    installments: Installment[]
}

class GetLoanByCodeUseCase {
    constructor(
        private readonly loanRepository: LoanDatabaseRepository,
        private readonly installmentRepository: InstallmentsDatabaseRepository
    ) {}

    async execute(input: Input): Promise<Optional<Output>> {
        const loan = await this.loanRepository.findByCode(input.code)

        if (!loan) {
            return null
        }

        const installments = await this.installmentRepository.findByLoanCode(input.code)

        const output: Output = {
            id: loan.getId(),
            code: input.code,
            amount: loan.getAmount(),
            period: loan.getPeriod(),
            rate: loan.getRate(),
            type: loan.getType(),
            installments
        }

        return output
    }
}

export { Input, Output }
export default GetLoanByCodeUseCase
