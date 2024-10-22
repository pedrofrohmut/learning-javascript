interface Connection {
    query(statement: string, params: any): Promise<void>
    close(): Promise<void>
}

export default Connection
