import pgp from "pg-promise"
import CreateTransactionUseCase from "../../src/application/usecases/create-transaction-usecase"
import GetTransactionByCodeUseCase from "../../src/application/usecases/get-transactions-by-code-usecase"

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
    await new CreateTransactionUseCase().execute(dbContext, input)

    const transactionDb = await new GetTransactionByCodeUseCase().execute(dbContext, { code })

    expect(transactionDb.value).toBe("1000")
    expect(transactionDb.numberInstallments).toBe(12)
    expect(transactionDb.paymentMethod).toBe("credit_card")
    expect(transactionDb.installments).toHaveLength(12)
    const first = transactionDb.installments?.find((x: any) => x.number === 1)
    expect(first?.value).toBe(83.33)
    const last = transactionDb.installments?.find((x: any) => x.number === 12)
    expect(last?.value).toBe(83.37)
})
