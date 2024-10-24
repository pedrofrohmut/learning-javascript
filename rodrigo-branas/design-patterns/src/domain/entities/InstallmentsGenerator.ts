import Installment from "./Installment"

interface InstallmentsGenerator {
    generate(loanAmount: number, loanPeriod: number, loanRate: number, loanCode: string): Promise<Installment[]>
}

export default InstallmentsGenerator
