import currency from "currency.js"
import Loan from "./Loan"
import Installment from "../entities/Installment"

class LoanPrice extends Loan {
    generateInstallments(): Installment[] {
        let balance = currency(this.amount)

        const rate = this.rate / 100
        const formula = Math.pow(1 + rate, this.period)
        const amount = balance.multiply((formula * rate) / (formula - 1))

        let installments: Installment[] = []
        let installmentNumber = 1

        while (balance.value > 0) {
            const interest = balance.multiply(rate)
            const amortization = amount.subtract(interest)
            balance = balance.subtract(amortization)

            if (balance.value <= 0.05) {
                balance = currency(0)
            }

            const installment = new Installment(
                crypto.randomUUID(),
                this.code,
                installmentNumber,
                amount.value,
                interest.value,
                amortization.value,
                balance.value
            )

            installments.push(installment)

            installmentNumber++
        }

        return installments
    }
}

export default LoanPrice
