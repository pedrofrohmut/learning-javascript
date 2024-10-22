class Installment {
    constructor(
        private readonly id: string,
        private readonly loanCode: string,
        private readonly number: number,
        private readonly amount: number,
        private readonly interest: number,
        private readonly amortization: number,
        private readonly balance: number
    ) {}

    getId = () => this.id

    getLoanCode = () => this.loanCode

    getNumber = () => this.number

    getAmount = () => this.amount

    getInterest = () => this.interest

    getAmortization = () => this.amortization

    getBalance = () => this.balance
}

export default Installment
