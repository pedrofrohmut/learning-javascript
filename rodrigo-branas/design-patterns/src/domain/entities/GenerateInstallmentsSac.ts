import currency from "currency.js"
import GenerateInstallments from "./GenerateInstallments"
import Installment from "./Installment"

class GenerateInstallmentsSac implements GenerateInstallments {
    async generate(loanAmount: number, loanPeriod: number, loanRate: number, loanCode: string): Promise<Installment[]> {
        let balance = currency(loanAmount)

        const rate = loanRate / 100
        const amortization = currency(balance.value / loanPeriod)

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
                loanCode,
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

export default GenerateInstallmentsSac
