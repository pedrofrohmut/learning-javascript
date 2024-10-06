import { v4 as uuidv4 } from "uuid"
import Transaction from "../../src/domain/entity/transaction"

test("Should create installments for a transaction", async () => {
    const id = uuidv4()
    const code = uuidv4()
    const transaction = new Transaction(id, code, 1000, 12, "credit_card", [])
    transaction.generateInstalments()

    expect(transaction.getValue()).toBe(1000)
    expect(transaction.getNumberInstallments()).toBe(12)
    expect(transaction.getPaymentMethod()).toBe("credit_card")

    expect(transaction.getInstallments()).toHaveLength(12)
    const first = transaction.getInstallments().find((x: any) => x.number === 1)
    expect(first?.getValue()).toBe(83.33)
    const last = transaction.getInstallments().find((x: any) => x.number === 12)
    expect(last?.getValue()).toBe(83.37)
})
