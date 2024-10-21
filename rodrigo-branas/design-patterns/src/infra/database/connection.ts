import pgp from "pg-promise"
import pg from "pg-promise/typescript/pg-subset"

type PgConnection = pgp.IDatabase<{}, pg.IClient>

class Connection {

    private readonly connection: PgConnection
    
    constructor() {
        this.connection = pgp()("postgres://postgres:password@localhost:5102")
    }

    async query(statement: string, params: any): Promise<void> {
        return this.connection.query(statement, params)
    }

    async close(): Promise<void> {
        this.connection.$pool.end()
    }
}

export { PgConnection }
export default Connection
