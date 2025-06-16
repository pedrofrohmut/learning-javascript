import currency from "currency.js"

import Loan, { LoanType } from "../../domain/entities/Loan"
import Installment from "../../domain/entities/Installment"
import InstallmentsRepository from "../repositories/installments-repository"
import LoansRepository from "../repositories/loans-repository"
import InstallmentsGeneratorFactory from "../../domain/factories/InstallmentsGeneratorFactory"

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
        private readonly loansRepository: LoansRepository,
        private readonly installmentRepository: InstallmentsRepository
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

        // Generate Installments Using a simple factory
        // const loan = new Loan(crypto.randomUUID(), input.code, loanAmount, input.period, rate, input.type)
        // await this.loansRepository.save(loan)
        // let installmentsGenerator = InstallmentsGeneratorFactory.create(input.type)
        // const installments = await installmentsGenerator.generate(loanAmount, input.period, loanRate, input.code)

        let installments: Installments[] = []
        if (input.type === "price") {
            const loan = new LoanPrice(crypto.randomUUID(), input.code, loanAmount, input.period, rate, input.type)
            loan.generateInstallments()
        } else if (input.type === "sac") {
            const loan = new LoanSac(crypto.randomUUID(), input.code, loanAmount, input.period, rate, input.type)
            loan.generateInstallments()
        }

        const saves = []
        for (const installment of installments) {
            saves.push(this.installmentRepository.save(installment))
        }
        await Promise.all(saves)
    }
}

export { Input }
export default StartLoanApplicationUseCase
