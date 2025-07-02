import pgp from "pg-promise"

import { postgres_string } from "../constants"
import DatabaseConnection from "./database-connection"

class PgDatabaseConnection implements DatabaseConnection {
    private readonly connection: any

    constructor() {
        this.connection = pgp()(postgres_string)
    }

    query(statement: string, params: any[]): Promise<any> {
        return this.connection.query(statement, params)
    }

    close(): Promise<void> {
        return this.connection.$pool.end()
    }
}

export default PgDatabaseConnection
