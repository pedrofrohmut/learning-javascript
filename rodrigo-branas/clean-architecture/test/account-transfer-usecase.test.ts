import Account from "../src/account"
import AccountGatewayDatabase from "../src/account-gateway-database"
import AccountGatewayMemory from "../src/account-gateway-memory"
import AccountTransferUseCase from "../src/account-transfer-usecase"
import PostgresAdapter from "../src/postgres-adapter"

test("Should transfer between accounts (InMemory)", async () => {
    const from = new Account("1")
    from.credit(200)
    expect(from.getBalance()).toBe(200)

    const to = new Account("2")
    to.credit(100)
    expect(to.getBalance()).toBe(100)

    const accountGateway = new AccountGatewayMemory()
    await accountGateway.save(from)
    await accountGateway.save(to)
    const accountTransferUseCase = new AccountTransferUseCase(accountGateway)

    const input = { from, to, amount: 50 }
    await accountTransferUseCase.execute(input)

    expect(from.getBalance()).toBe(150)
    expect(to.getBalance()).toBe(150)
})

test("Should transfer between accounts (Database)", async () => {
    const from = new Account("1")
    from.credit(200)
    expect(from.getBalance()).toBe(200)

    const to = new Account("2")
    to.credit(100)
    expect(to.getBalance()).toBe(100)

    const connection = new PostgresAdapter()
    const accountGateway = new AccountGatewayDatabase(connection)
    await accountGateway.save(from)
    await accountGateway.save(to)
    const accountTransferUseCase = new AccountTransferUseCase(accountGateway)

    const input = { from, to, amount: 50 }
    await accountTransferUseCase.execute(input)

    expect(from.getBalance()).toBe(150)
    expect(to.getBalance()).toBe(150)
})
