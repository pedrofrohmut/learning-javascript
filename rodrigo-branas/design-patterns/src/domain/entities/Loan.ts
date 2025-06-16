import Installment from "../entities/Installment"

type LoanType = "price" | "sac"

abstract class Loan {
    constructor(
        protected readonly id: string,
        protected readonly code: string,
        protected readonly amount: number,
        protected readonly period: number,
        protected readonly rate: number,
        protected readonly type: LoanType
    ) {
        // TODO: add salary to the properties and later also to the database
        // TODO: add here the business rule for if (salary ....) {}
    }

    getId = () => this.id

    getCode = () => this.code

    getAmount = () => this.amount

    getPeriod = () => this.period

    getRate = () => this.rate

    getType = () => this.type

    abstract generateInstallments(): Installment[]
}

export { LoanType }
export default Loan
