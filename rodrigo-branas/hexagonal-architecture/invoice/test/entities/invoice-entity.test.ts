import InvoiceEntity from "../../src/entities/invoice-entity"

test("Get total", () => {
    const cardTransactions = [
        { amount: 100, currency: "BRL" },
        { amount: 1000, currency: "BRL" },
        { amount: 300, currency: "USD" },
        { amount: 1300, currency: "USD" }
    ]
    const currencies = { usd: 3 }
    const total = InvoiceEntity.getTotalFromCardTransactions(cardTransactions, currencies)
    expect(total).toBe(5900)
})
