import CalculateInvoiceUseCase from "../../src/usecases/calculate-invoice-usecase"
import ITransactionsDao from "../../src/application/itransactions-dao"
import ICurrencyGateway from "../../src/application/icurrency-gateway"

test("Deve calcular a fatura", async () => {
    const transactionsDao: ITransactionsDao = {
        async getTransactions(_cardNumber: string, _month: number, _year: number): Promise<any> {
            return [
                { amount: 100, currency: "BRL" },
                { amount: 1000, currency: "BRL" },
                { amount: 600, currency: "USD" }
            ]
        }
    }

    class MockCurrencyGateway implements ICurrencyGateway {
        getCurrencies(_url: string): Promise<any> {
            return Promise.resolve({ usd: 2 })
        }
    }
    const currencyGateway: ICurrencyGateway = new MockCurrencyGateway()

    const calculateInvoice = new CalculateInvoiceUseCase(transactionsDao, currencyGateway)
    const total = await calculateInvoice.execute("1234", "_")
    expect(total).toBe(2300)
})
