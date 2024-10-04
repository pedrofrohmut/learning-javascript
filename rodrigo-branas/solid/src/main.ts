import express, { Request, Response } from "express"
import pgp from "pg-promise"
import CreateTransactionUseCase, {
    Input as CreateTransactionInput
} from "./application/usecases/create-transaction-usecase"
import GetTransactionByCodeUseCase, {
    Input as GetTransactionByCodeInput
} from "./application/usecases/get-transactions-by-code-usecase"
import TransactionDatabaseRepository from "./infra/repositories/transaction-database-repository"
import PostgresConnection from "./infra/database/postgres-connection"

const app = express()

// Middleware to parse the request body when it is on json format
app.use(express.json())

// Creates a single instance to be used for all the request (as adviced on the documentation)
const dbConnection = new PostgresConnection()

const transactionRepository = new TransactionDatabaseRepository(dbConnection)

app.post("/transactions", async (req: Request, res: Response) => {
    const input: CreateTransactionInput = {
        code: req.body.code,
        value: req.body.value,
        numberInstallments: req.body.numberInstallments,
        paymentMethod: req.body.paymentMethod
    }

    const createTransactionUseCase = CreateTransactionUseCase.getInstance(transactionRepository)
    await createTransactionUseCase.execute(input)
    //await new CreateTransactionUseCase(transactionRepository).execute(input)

    res.status(201).end()
})

app.get("/transactions/:code", async (req: Request, res: Response) => {
    const input: GetTransactionByCodeInput = { code: req.params.code }

    try {
        const getTransactionByCodeUseCase = GetTransactionByCodeUseCase.getInstance(transactionRepository)
        const { transaction } = await getTransactionByCodeUseCase.execute(input)
        //const transaction = await new GetTransactionByCodeUseCase(transactionRepository).execute(input)

        res.json(transaction)
    } catch (e: any) {
        res.status(400).send(e.message)
    }
})

app.listen(3000)
