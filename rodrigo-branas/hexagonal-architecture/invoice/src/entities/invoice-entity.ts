class InvoiceEntity {
    constructor() {}

    static getTotalFromCardTransactions(cardTransactions: any, currencies: any): number {
        return cardTransactions.reduce(
            (acc: number, x: any) => acc + (x.currency == "USD" ? currencies.usd : 1) * parseFloat(x.amount),
            0
        )
    }
}

export default InvoiceEntity
