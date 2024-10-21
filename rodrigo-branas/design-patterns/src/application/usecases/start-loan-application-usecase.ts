import currency from "currency.js"
import Connection from "../../infra/database/connection"

type Input = {
    code: string
    purchasePrice: number
    downPayment: number
    salary: number
    period: number
    type: string
}

class StartLoanApplicationUseCase {
    constructor() {}

    async execute(input: Input): Promise<void> {
        const connection = new Connection()

        const loanAmount = input.purchasePrice - input.downPayment
        const loanRate = 1

        if (input.salary * 0.25 < loanAmount / input.period) {
            throw new Error("Insufficient salary")
        }

        let balance = currency(loanAmount)
        let installmentNumber = 1
        const rate = loanRate / 100

        const loanId = crypto.randomUUID()
        const loansStm = `INSERT INTO loans (id, code, amount, period, rate, type) VALUES ($1, $2, $3, $4, $5, $6)`
        await connection.query(loansStm, [loanId, input.code, loanAmount, input.period, loanRate, input.type])

        if (input.type == "price") {
            const formula = Math.pow(1 + rate, input.period)
            const amount = balance.multiply((formula * rate) / (formula - 1))
            const installmentsStm = `INSERT INTO installments (id, loan_code, number, amount, interest, amortization, balance) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`
            while (balance.value > 0) {
                const interest = balance.multiply(rate)
                const amortization = amount.subtract(interest)
                balance = balance.subtract(amortization)
                if (balance.value <= 0.05) {
                    balance = currency(0)
                }
                await connection.query(installmentsStm, [
                    crypto.randomUUID(),
                    input.code,
                    installmentNumber,
                    amount.value,
                    interest.value,
                    amortization.value,
                    balance.value
                ])
                installmentNumber++
            }
        }

        if (input.type == "sac") {
            const amortization = currency(balance.value / input.period)
            const installmentsStm = `INSERT INTO installments (id, loan_code, number, amount, interest, amortization, balance) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`
            while (balance.value > 0) {
                const initialBalance = currency(balance.value)
                const interest = currency(initialBalance.value * rate)
                const updatedBalance = currency(initialBalance.value + interest.value)
                const amount = currency(interest.value + amortization.value)
                balance = currency(updatedBalance.value - amount.value)
                if (balance.value <= 0.05) {
                    balance = currency(0)
                }
                await connection.query(installmentsStm, [
                    crypto.randomUUID(),
                    input.code,
                    installmentNumber,
                    amount.value,
                    interest.value,
                    amortization.value,
                    balance.value
                ])
                installmentNumber++
            }
        }

        connection.close()
    }
}

export { Input }
export default StartLoanApplicationUseCase
