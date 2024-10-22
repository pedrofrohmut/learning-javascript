import pgp from "pg-promise"
import LoanDatabaseRepository from "../../infra/repositories/loan-database-repository"
import InstallmentDatabaseRepository from "../../infra/repositories/installments-database-repository"

type Input = {
    code: string
}

type Installment = {
    installmentNumber: number
    amount: number
    interest: number
    amortization: number
    balance: number
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
        private readonly installmentRepository: InstallmentDatabaseRepository
    ) {}

    async execute(input: Input): Promise<Output> {
        const loanData = await this.loanRepository.findByCode(input.code)
        const installmentsData = await this.installmentRepository.findByLoanCode(input.code)

        const output: Output = {
            id: loanData.id,
            code: input.code,
            amount: loanData.amount,
            period: loanData.period,
            rate: loanData.rate,
            type: loanData.type,
            installments: []
        }

        for (const installmentData of installmentsData) {
            output.installments.push({
                installmentNumber: parseInt(installmentData.number),
                amount: parseFloat(installmentData.amount),
                interest: parseFloat(installmentData.interest),
                amortization: parseFloat(installmentData.amortization),
                balance: parseFloat(installmentData.balance)
            })
        }

        return output
    }
}

export { Input, Output, Installment }
export default GetLoanByCodeUseCase
