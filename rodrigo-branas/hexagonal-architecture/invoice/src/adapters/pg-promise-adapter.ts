import pgPromise from "pg-promise"
import pg from "pg-promise/typescript/pg-subset"

import IConnection from "../application/iconnection";

export type DbContext = pgPromise.IDatabase<{}, pg.IClient>

class PgPromiseAdapter implements IConnection {

    private readonly connection: DbContext

    constructor() {
        const pgp = pgPromise()
        this.connection = pgp("postgres://postgres:password@localhost:5101/postgres")
    }

    query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params)
    }

    close(): Promise<any> {
        return this.connection.$pool.end()
    }

}

export default PgPromiseAdapter
