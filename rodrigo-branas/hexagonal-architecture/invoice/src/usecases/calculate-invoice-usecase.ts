import ITransactionsDao from "../daos/itransactions-dao"
import InvoiceEntity from "../entities/invoice-entity"
import ICurrencyGateway from "../gateways/icurrency-gateway"

class CalculateInvoiceUseCase {
    private readonly transactionDao: ITransactionsDao
    private readonly currencyGateway: ICurrencyGateway

    constructor(transactionDao: ITransactionsDao, currencyGateway: ICurrencyGateway) {
        this.transactionDao = transactionDao
        this.currencyGateway = currencyGateway
    }

    async execute(cardNumber: string): Promise<number> {
        const currencies = await this.currencyGateway.getCurrencies("http://localhost:5001/currencies")

        const now = new Date()
        const currMonth = now.getMonth()
        const currYear = now.getFullYear()

        const cardTransactions = await this.transactionDao.getTransactions(cardNumber, currMonth, currYear)

        return InvoiceEntity.getTotalFromCardTransactions(cardTransactions, currencies)
    }
}

export default CalculateInvoiceUseCase
