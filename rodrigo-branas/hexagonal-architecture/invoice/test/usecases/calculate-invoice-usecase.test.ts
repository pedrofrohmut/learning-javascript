import CalculateInvoiceUseCase from "../../src/usecases/calculate-invoice-usecase"
import CurrencyGateway from "../../src/gateways/currency-gateway"
import ITransactionsDao from "../../src/daos/itransactions-dao"

test("Deve calcular a fatura", async () => {
    const transactionsDao: ITransactionsDao = {
        async getTransactions(_cardNumber: string, _month: number, _year: number): Promise<any> {
            return [
                { amount: 100, currency: "BRL" },
                { amount: 1000, currency: "BRL" },
                { amount: 600, currency: "USD" }
            ]
        },
    }

    const currencyGateway: CurrencyGateway = {
        async getCurrencies(): Promise<any> {
            return { usd: 2 }
        }
    }

    const calculateInvoice = new CalculateInvoiceUseCase(transactionsDao, currencyGateway)
    const total = await calculateInvoice.execute("1234")
    expect(total).toBe(2300)
})
