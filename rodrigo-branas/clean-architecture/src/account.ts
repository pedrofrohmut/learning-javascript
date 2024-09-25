class Account {
    private readonly id: string

    private balance: number

    constructor(id: string) {
        this.balance = 0
        this.id = id
    }

    getBalance(): number {
        return this.balance
    }

    credit(amount: number): void {
        this.balance += amount
    }

    debit(amount: number): void {
        this.balance -= amount
    }
}

export default Account
