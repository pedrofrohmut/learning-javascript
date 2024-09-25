class Account {
    private readonly id: string

    private balance: number

    constructor(id: string) {
        this.balance = 0
        this.id = id
    }

    getId(): string {
        return this.id
    }

    getBalance(): number {
        return this.balance
    }

    setBalance(amount: number): void {
        this.balance = amount
    }

    credit(amount: number): void {
        this.balance += amount
    }

    debit(amount: number): void {
        this.balance -= amount
    }
}

export default Account
