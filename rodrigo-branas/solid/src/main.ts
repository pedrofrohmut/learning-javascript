import express, { Request, Response } from "express"
import pgp from "pg-promise"
import CreateTransactionUseCase, { Input as CreateTransactionInput } from "./application/usecases/create-transaction-usecase"
import GetTransactionByCodeUseCase, { Input as GetTransactionByCodeInput } from "./application/usecases/get-transactions-by-code-usecase"

// Creates a single instance to be used for all the request (as adviced on the documentation)
const dbContext = pgp()("postgres://postgres:password@localhost:5105")

const app = express()

// Middleware to parse the request body when it is on json format
app.use(express.json())

app.post("/transactions", async (req: Request, res: Response) => {
    const input: CreateTransactionInput = {
        code: req.body.code,
        value: req.body.value,
        numberInstallments: req.body.numberInstallments,
        paymentMethod: req.body.paymentMethod
    }
    await new CreateTransactionUseCase().execute(dbContext, input)
    res.end()
})

app.get("/transactions/:code", async (req: Request, res: Response) => {
    const input: GetTransactionByCodeInput = { code: req.params.code }
    try {
        const transaction = await new GetTransactionByCodeUseCase().execute(dbContext, input)
        res.json(transaction)
    } catch (e: any) {
        res.status(400).send(e.message)
    }
})

app.listen(3000)
