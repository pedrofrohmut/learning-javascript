type LoanType = "price" | "sac"

class Loan {
    constructor(
        private readonly id: string,
        private readonly code: string,
        private readonly amount: number,
        private readonly period: number,
        private readonly rate: number,
        private readonly type: LoanType
    ) {}

    getId = () => this.id

    getCode = () => this.code

    getAmount = () => this.amount

    getPeriod = () => this.period

    getRate = () => this.rate

    getType = () => this.type
}

export { LoanType }
export default Loan
