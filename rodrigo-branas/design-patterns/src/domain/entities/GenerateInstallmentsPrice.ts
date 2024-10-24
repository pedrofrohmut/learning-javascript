import currency from "currency.js"
import GenerateInstallments from "./GenerateInstallments"
import Installment from "./Installment"

class GenerateInstallmentsPrice implements GenerateInstallments {
    async generate(loanAmount: number, loanPeriod: number, loanRate: number, loanCode: string): Promise<Installment[]> {
        let balance = currency(loanAmount)

        const rate = loanRate / 100
        const formula = Math.pow(1 + rate, loanPeriod)
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

export default GenerateInstallmentsPrice
