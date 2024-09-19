interface IConnection {
    query(statement: string, params: any): Promise<any>
    close(): Promise<any>
}

export default IConnection
