import Installment from "../../domain/entities/Installment"
import InstallmentsRepository from "../repositories/installments-repository"
import LoansRepository from "../repositories/loans-repository"

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
        private readonly loansRepository: LoansRepository,
        private readonly installmentRepository: InstallmentsRepository
    ) {}

    async execute(input: Input): Promise<Optional<Output>> {
        const loan = await this.loansRepository.findByCode(input.code)

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
