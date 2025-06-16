import currency from "currency.js"
import Loan from "./Loan"
import Installment from "../entities/Installment"

class LoanSac extends Loan {
    generateInstallments(): Installment[] {
        let balance = currency(this.amount)

        const rate = this.rate / 100
        const amortization = currency(balance.value / this.period)

        let installments: Installment[] = []
        let installmentNumber = 1

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

export default LoanSac
