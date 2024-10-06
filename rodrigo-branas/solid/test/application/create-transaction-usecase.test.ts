import { v4 as uuidv4 } from "uuid"

import CreateTransactionUseCase from "../../src/application/usecases/create-transaction-usecase"
import GetTransactionByCodeUseCase from "../../src/application/usecases/get-transactions-by-code-usecase"
import TransactionDatabaseRepository from "../../src/infra/repositories/transaction-database-repository"
import PostgresConnection from "../../src/infra/database/postgres-connection"
import IConnection from "../../src/infra/database/iconnection"
import TransactionInMemoryRepository from "../../src/infra/repositories/transaction-inmemory-repository"

let dbConnection: IConnection | undefined = undefined

beforeAll(() => {
    dbConnection = new PostgresConnection()
})

afterAll(async () => {
    dbConnection && await dbConnection.close()
})

test("Should create a transaction (Postgres))", async () => {
    const code = uuidv4()
    const input = { code, value: 1000, numberInstallments: 12, paymentMethod: "credit_card" }

    const transactionRepository = new TransactionDatabaseRepository(dbConnection!)

    await CreateTransactionUseCase.getInstance(transactionRepository).execute(input)

    const { transaction } = await GetTransactionByCodeUseCase.getInstance(transactionRepository).execute({ code })

    expect(transaction.getValue()).toBe(1000)
    expect(transaction.getNumberInstallments()).toBe(12)
    expect(transaction.getPaymentMethod()).toBe("credit_card")

    expect(transaction.getInstallments()).toHaveLength(12)
    const first = transaction.getInstallments().find((x: any) => x.number === 1)
    expect(first?.getValue()).toBe(83.33)
    const last = transaction.getInstallments().find((x: any) => x.number === 12)
    expect(last?.getValue()).toBe(83.37)
})

test("Should create a transaction (InMemory))", async () => {
    const code = uuidv4()
    const input = { code, value: 1000, numberInstallments: 12, paymentMethod: "credit_card" }

    const transactionRepository = new TransactionInMemoryRepository()

    await CreateTransactionUseCase.getInstance(transactionRepository).execute(input)

    const { transaction } = await GetTransactionByCodeUseCase.getInstance(transactionRepository).execute({ code })

    expect(transaction.getValue()).toBe(1000)
    expect(transaction.getNumberInstallments()).toBe(12)
    expect(transaction.getPaymentMethod()).toBe("credit_card")

    expect(transaction.getInstallments()).toHaveLength(12)
    const first = transaction.getInstallments().find((x: any) => x.number === 1)
    expect(first?.getValue()).toBe(83.33)
    const last = transaction.getInstallments().find((x: any) => x.number === 12)
    expect(last?.getValue()).toBe(83.37)
})
