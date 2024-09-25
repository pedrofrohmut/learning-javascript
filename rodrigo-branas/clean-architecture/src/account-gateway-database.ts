import Account from "./account"
import IAccountGateway from "./iaccounts-gateway"
import IConnection from "./iconnection"

class AccountGatewayDatabase implements IAccountGateway {
    private readonly connection: IConnection

    constructor(connection: IConnection) {
        this.connection = connection
    }

    async get(id: string): Promise<Account> {
        const [accountData] = await this.connection.query("select * from account where id = $1", [id])
        const account = new Account(accountData.id)
        account.setBalance(accountData.balance)
        return account
    }

    async save(account: Account): Promise<void> {
        await this.connection.query("insert into accounts (id, balance) values ($1, $2)", [
            account.getId(),
            account.getBalance()
        ])
    }

    async update(account: Account): Promise<void> {
        await this.connection.query("update accounts set balance = $1 where id = $2", [
            account.getBalance(),
            account.getId()
        ])
    }
}

export default AccountGatewayDatabase
