import IConnection from "../database/iconnection"
import ITransactionRepository from "../../domain/repositories/itransaction-repository"
import CreateTransactionUseCase, {
    Input as CreateTransactionInput
} from "../../application/usecases/create-transaction-usecase"
import GetTransactionByCodeUseCase, {
    Input as GetTransactionByCodeInput
} from "../../application/usecases/get-transactions-by-code-usecase"
import IHttpServer from "./ihttp-server"

class Router {
    private readonly httpServer: IHttpServer
    private readonly dbConnection: IConnection
    private readonly transactionRepository: ITransactionRepository

    constructor(httpServer: IHttpServer, dbConnection: IConnection, transactionRepository: ITransactionRepository) {
        this.httpServer = httpServer

        // Creates a single instance to be used for all the request (as adviced on the documentation)
        this.dbConnection = dbConnection

        this.transactionRepository = transactionRepository
    }

    init(): void {
        this.httpServer.on("POST", "/transactions", async (_params: any, body: any) => {
            const input: CreateTransactionInput = {
                code: body.code,
                value: body.value,
                numberInstallments: body.numberInstallments,
                paymentMethod: body.paymentMethod
            }

            const createTransactionUseCase = CreateTransactionUseCase.getInstance(this.transactionRepository)
            await createTransactionUseCase.execute(input)
        })

        this.httpServer.on("GET", "/transactions/:code", async (params: any, _body: any) => {
            const input: GetTransactionByCodeInput = { code: params.code }
            const getTransactionByCodeUseCase = GetTransactionByCodeUseCase.getInstance(this.transactionRepository)
            const { transaction } = await getTransactionByCodeUseCase.execute(input)
            return transaction
        })
    }

    async start(): Promise<void> {
        try {
            await this.dbConnection.testConnection()
        } catch (err: any) {
            console.error(err.message)
            process.exit(1)
        }
        this.httpServer.listen(3000)
    }
}

export default Router
