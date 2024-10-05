import ExpressHttpServer from "./infra/api/express-http-server"
import Router from "./infra/api/router"
import PostgresConnection from "./infra/database/postgres-connection"
import TransactionDatabaseRepository from "./infra/repositories/transaction-database-repository"

const main = async () => {
    const httpServer = new ExpressHttpServer()
    const connection = new PostgresConnection()
    const transactionRepository = new TransactionDatabaseRepository(connection)
    const router = new Router(httpServer, connection, transactionRepository)
    router.init()
    await router.start()
}

main()
