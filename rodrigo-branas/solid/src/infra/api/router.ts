import express, { Request, Response, Express } from "express"

import IConnection from "../database/iconnection"
import ITransactionRepository from "../../domain/repositories/itransaction-repository"
import PostgresConnection from "../database/postgres-connection"
import TransactionDatabaseRepository from "../repositories/transaction-database-repository"
import CreateTransactionUseCase, {
    Input as CreateTransactionInput
} from "../../application/usecases/create-transaction-usecase"
import GetTransactionByCodeUseCase, {
    Input as GetTransactionByCodeInput
} from "../../application/usecases/get-transactions-by-code-usecase"

class Router {
    private readonly app: Express
    private readonly dbConnection: IConnection
    private readonly transactionRepository: ITransactionRepository

    constructor() {
        this.app = express()

        // Middleware to parse the request body when it is on json format
        this.app.use(express.json())

        // Creates a single instance to be used for all the request (as adviced on the documentation)
        this.dbConnection = new PostgresConnection()
        this.transactionRepository = new TransactionDatabaseRepository(this.dbConnection)

        this.app.post("/transactions", async (req: Request, res: Response) => {
            const input: CreateTransactionInput = {
                code: req.body.code,
                value: req.body.value,
                numberInstallments: req.body.numberInstallments,
                paymentMethod: req.body.paymentMethod
            }

            const createTransactionUseCase = CreateTransactionUseCase.getInstance(this.transactionRepository)
            await createTransactionUseCase.execute(input)

            res.status(201).end()
        })

        this.app.get("/transactions/:code", async (req: Request, res: Response) => {
            const input: GetTransactionByCodeInput = { code: req.params.code }

            try {
                const getTransactionByCodeUseCase = GetTransactionByCodeUseCase.getInstance(this.transactionRepository)
                const { transaction } = await getTransactionByCodeUseCase.execute(input)

                res.json(transaction)
            } catch (e: any) {
                res.status(400).send(e.message)
            }
        })
    }

    async start(): Promise<void> {
        try {
            await this.dbConnection.testConnection()
        } catch (err: any) {
            console.error(err.message)
            process.exit(1)
        }
        this.app.listen(3000)
    }
}

export default Router
