import pgp from "pg-promise"
import CreateTransactionUseCase from "../../src/application/usecases/create-transaction-usecase"
import GetTransactionByCodeUseCase from "../../src/application/usecases/get-transactions-by-code-usecase"
import TransactionDatabaseRepository from "../../src/infra/repositories/transaction-database-repository"

let dbContext: any = null

beforeAll(() => {
    dbContext = pgp()("postgres://postgres:password@localhost:5105")
})

afterAll(() => {
    dbContext = undefined
})

test("Should create a transaction", async () => {
    const code = Math.floor(Math.random() * 1000).toString()
    const input = { code, value: 1000, numberInstallments: 12, paymentMethod: "credit_card" }
    const transactionRepository = new TransactionDatabaseRepository(dbContext)
    await new CreateTransactionUseCase(transactionRepository).execute(input)

    const { transaction } = await new GetTransactionByCodeUseCase(transactionRepository).execute({ code })

    expect(transaction.getValue()).toBe(1000)
    expect(transaction.getNumberInstallments()).toBe(12)
    expect(transaction.getPaymentMethod()).toBe("credit_card")

    expect(transaction.getInstallments()).toHaveLength(12)
    const first = transaction.getInstallments().find((x: any) => x.number === 1)
    expect(first?.getValue()).toBe(83.33)
    const last = transaction.getInstallments().find((x: any) => x.number === 12)
    expect(last?.getValue()).toBe(83.37)
})
