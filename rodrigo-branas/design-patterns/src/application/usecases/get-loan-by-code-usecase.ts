import pgp from "pg-promise"

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
    constructor() {}

    async execute(input: Input): Promise<Output> {
        const dbContext = pgp()("postgres://postgres:password@localhost:5102")
        const [loanData] = await dbContext.query("SELECT * FROM loans WHERE code = $1", [input.code])
        const installmentsData = await dbContext.query("SELECT * FROM installments WHERE loan_code = $1", [input.code])
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
        dbContext.$pool.end()
        return output
    }
}

export { Input, Output, Installment }
export default GetLoanByCodeUseCase
