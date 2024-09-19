interface ITransactionsDao {
    getTransactions(cardNumber: string, month: number, year: number): Promise<any>
}

export default ITransactionsDao
