import axios from "axios"
import Transaction from "../src/domain/entity/transaction"

const BASE_URL = "http://localhost:3000"

test("Should create a transaction", async () => {
    const code = Math.floor(Math.random() * 1000)
    const newTransaction = { code: code.toString(), value: 1000, numberInstallments: 12, paymentMethod: "credit_card" }
    await axios.post(`${BASE_URL}/transactions`, newTransaction)

    const { data } = await axios.get(`${BASE_URL}/transactions/${code}`)

    const transaction: any = data.transaction

    expect(transaction.value).toBe(1000)
    expect(transaction.numberInstallments).toBe(12)
    expect(transaction.paymentMethod).toBe("credit_card")

    expect(transaction.installments).toHaveLength(12)
    const first = transaction.installments.find((x: any) => x.number == 1)
    expect(first?.value).toBe(83.33)
    const last = transaction.installments.find((x: any) => x.number == 12)
    expect(last?.value).toBe(83.37)
})
