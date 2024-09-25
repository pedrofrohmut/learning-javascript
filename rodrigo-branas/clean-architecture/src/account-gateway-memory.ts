import Account from "./account"
import IAccountGateway from "./iaccounts-gateway"

class AccountGatewayMemory implements IAccountGateway {
    private readonly accounts: Account[]

    constructor() {
        this.accounts = []
    }

    async get(id: string): Promise<Account> {
        const account = this.accounts.find((x) => x.getId() === id)
        if (account == undefined) {
            throw new Error("Account not found")
        }
        return account
    }

    async save(account: Account): Promise<void> {
        this.accounts.push(account)
    }

    async update(account: Account): Promise<void> {
        const existingAccount = await this.get(account.getId())
        existingAccount.setBalance(account.getBalance())
    }
}

export default AccountGatewayMemory
