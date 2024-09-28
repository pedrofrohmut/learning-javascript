import axios from "axios"

const BASE_URL = "http://localhost:3000"

test("Should create a transaction", async () => {
    const code = Math.floor(Math.random() * 1000)
    const transaction = { code: code.toString(), value: 1000, numberInstallments: 12, paymentMethod: "credit_card" }
    await axios.post(`${BASE_URL}/transactions`, transaction)

    const { data: transactionDb } = await axios.get(`${BASE_URL}/transactions/${code}`)

    expect(transactionDb.value).toBe("1000")
    expect(transactionDb.numberInstallments).toBe(12)
    expect(transactionDb.paymentMethod).toBe("credit_card")

    expect(transactionDb.installments).toHaveLength(12)

    const first = transactionDb.installments.find((x: any) => x.number == 1)
    expect(first.value).toBe(83.33)

    const last = transactionDb.installments.find((x: any) => x.number == 12)
    expect(last.value).toBe(83.37)
})
