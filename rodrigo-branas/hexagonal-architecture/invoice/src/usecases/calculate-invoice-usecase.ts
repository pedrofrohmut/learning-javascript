import ITransactionsDao from "../daos/itransactions-dao"
import ICurrencyGateway from "../gateways/icurrency-gateway"

class CalculateInvoiceUseCase {
    private readonly transactionDao: ITransactionsDao
    private readonly currencyGateway: ICurrencyGateway

    constructor(transactionDao: ITransactionsDao, currencyGateway: ICurrencyGateway) {
        this.transactionDao = transactionDao
        this.currencyGateway = currencyGateway
    }

    async execute(cardNumber: string): Promise<number> {
        const currencies = await this.currencyGateway.getCurrencies()

        const now = new Date()
        const currMonth = now.getMonth()
        const currYear = now.getFullYear()

        const cardTransactions = await this.transactionDao.getTransactions(cardNumber, currMonth, currYear)

        const total = cardTransactions.reduce(
            (acc: number, x: any) => acc + (x.currency == "USD" ? currencies.usd : 1) * parseFloat(x.amount),
            0
        )

        return total
    }
}

export default CalculateInvoiceUseCase
