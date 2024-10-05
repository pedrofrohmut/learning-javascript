import pgp from "pg-promise"
import pg from "pg-promise/typescript/pg-subset"

import IConnection from "./iconnection"

class PostgresConnection implements IConnection {
    private readonly connection: pgp.IDatabase<{}, pg.IClient>

    constructor() {
        this.connection = pgp()("postgres://postgres:password@localhost:5105")
    }

    query(statement: string, params: any[]): Promise<any> {
        return this.connection.query(statement, params)
    }

    async close(): Promise<void> {
        // IMPORTANT: Note that if your app is an HTTP service, or generally an
        // application that does not feature any exit point, then you should not
        // do any de-initialization at all. It is only if your app is a run-through
        // process/utility, then you might want to use it, so the process ends without delays.
        try {
            await this.connection.$pool.end()
        } catch (err) {
            throw new Error("ERROR: Could not close the connection pool.")
        }
    }

    async testConnection() {
        console.log("Testing connection...")
        try {
            await this.connection.connect()
            console.log("Database connected successfully")
        } catch (err: any) {
            throw new Error("Error to connect to postgres database. " + err)
        }
    }

}

export default PostgresConnection
