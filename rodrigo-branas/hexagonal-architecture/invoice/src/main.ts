import CalcutateInvoiceUseCase from "./usecases/calculate-invoice-usecase"
import TransactionsDao from "./daos/transactions-dao"
import CurrencyGateway from "./gateways/currency-gateway"
import PgPromiseAdapter from "./adapters/pg-promise-adapter"
import AxiosAdapter from "./adapters/axios-adapter"
import ExpressAdapter from "./adapters/express-adapter"

const server = new ExpressAdapter()

server.addRoute("GET", "/cards/:cardNumber/invoices", async (params: any, _body: any) => {
    const connection = new PgPromiseAdapter()
    const transactionsDao = new TransactionsDao(connection)
    const httpClient = new AxiosAdapter()
    const currencyGateway = new CurrencyGateway(httpClient)
    const calculateInvoiceUseCase = new CalcutateInvoiceUseCase(transactionsDao, currencyGateway)

    const now = new Date()
    const currMonth = now.getMonth() + 1 // +1 because the month is 0 based (0 - january and 11 december)
    const currYear = now.getFullYear()
    const total = await calculateInvoiceUseCase.execute(params.cardNumber, "http://localhost:5001/currencies", currMonth, currYear)

    return total
})

server.listen(5000, "Server started on http://localhost:5000")
