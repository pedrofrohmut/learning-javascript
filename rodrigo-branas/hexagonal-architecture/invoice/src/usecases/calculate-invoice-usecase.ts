import ITransactionsDao from "../application/itransactions-dao"
import InvoiceEntity from "../entities/invoice-entity"
import ICurrencyGateway from "../application/icurrency-gateway"

class CalculateInvoiceUseCase {
    private readonly transactionDao: ITransactionsDao
    private readonly currencyGateway: ICurrencyGateway

    constructor(transactionDao: ITransactionsDao, currencyGateway: ICurrencyGateway) {
        this.transactionDao = transactionDao
        this.currencyGateway = currencyGateway
    }

    async execute(cardNumber: string, currenciesUrl: string, month: number, year: number): Promise<number> {
        const currencies = await this.currencyGateway.getCurrencies(currenciesUrl)
        const cardTransactions = await this.transactionDao.getTransactions(cardNumber, month, year)
        return InvoiceEntity.getTotalFromCardTransactions(cardTransactions, currencies)
    }
}

export default CalculateInvoiceUseCase
