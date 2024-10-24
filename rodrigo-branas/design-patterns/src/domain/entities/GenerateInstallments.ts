import Installment from "./Installment"

interface GenerateInstallments {
    generate(loanAmount: number, loanPeriod: number, loanRate: number, loanCode: string): Promise<Installment[]>
}

export default GenerateInstallments
