import currency from "currency.js"

import LoanDatabaseRepository from "../../infra/repositories/loan-database-repository"
import Loan, { LoanType } from "../../domain/entities/Loan"
import Installment from "../../domain/entities/Installment"
import InstallmentDatabaseRepository from "../../infra/repositories/installments-database-repository"

type Input = {
    code: string
    purchasePrice: number
    downPayment: number
    salary: number
    period: number
    type: LoanType
}

class StartLoanApplicationUseCase {
    constructor(
        private readonly loanRepository: LoanDatabaseRepository,
        private readonly installmentRepository: InstallmentDatabaseRepository
    ) {}

    async execute(input: Input): Promise<void> {
        const loanAmount = input.purchasePrice - input.downPayment
        const loanRate = 1

        if (input.salary * 0.25 < loanAmount / input.period) {
            throw new Error("Insufficient salary")
        }

        let balance = currency(loanAmount)
        let installmentNumber = 1
        const rate = loanRate / 100
        const loan = new Loan(crypto.randomUUID(), input.code, loanAmount, input.period, rate, input.type)

        await this.loanRepository.save(loan)

        if (input.type == "price") {
            const formula = Math.pow(1 + rate, input.period)
            const amount = balance.multiply((formula * rate) / (formula - 1))

            while (balance.value > 0) {
                const interest = balance.multiply(rate)
                const amortization = amount.subtract(interest)
                balance = balance.subtract(amortization)

                if (balance.value <= 0.05) {
                    balance = currency(0)
                }

                const installment = new Installment(
                    crypto.randomUUID(),
                    input.code,
                    installmentNumber,
                    amount.value,
                    interest.value,
                    amortization.value,
                    balance.value
                )

                await this.installmentRepository.save(installment)

                installmentNumber++
            }
        }

        if (input.type == "sac") {
            const amortization = currency(balance.value / input.period)

            while (balance.value > 0) {
                const initialBalance = currency(balance.value)
                const interest = currency(initialBalance.value * rate)
                const updatedBalance = currency(initialBalance.value + interest.value)
                const amount = currency(interest.value + amortization.value)
                balance = currency(updatedBalance.value - amount.value)

                if (balance.value <= 0.05) {
                    balance = currency(0)
                }

                const installment = new Installment(
                    crypto.randomUUID(),
                    input.code,
                    installmentNumber,
                    amount.value,
                    interest.value,
                    amortization.value,
                    balance.value
                )

                await this.installmentRepository.save(installment)

                installmentNumber++
            }
        }
    }
}

export { Input }
export default StartLoanApplicationUseCase
