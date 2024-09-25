import pgPromise from "pg-promise"
import pg from "pg-promise/typescript/pg-subset"

import IConnection from "./iconnection"

class PostgresAdapter implements IConnection {
    private readonly pgp: pgPromise.IDatabase<{}, pg.IClient>

    constructor() {
        this.pgp = pgPromise()("postgres://postgres:password@localhost:5103/postgres")
    }

    async query(statement: string, params: any[]): Promise<any> {
        return this.pgp.query(statement, params)
    }

    async close(): Promise<void> {
        this.pgp.$pool.end()
    }
}

export default PostgresAdapter
