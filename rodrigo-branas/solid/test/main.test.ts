import axios from "axios"

const BASE_URL = "http://localhost:3000"

test("Should create a transaction", async () => {
    const code = Math.floor(Math.random() * 1000)
    const transaction = { code: code.toString(), amount: 1000, numberInstallments: 12, paymentMethod: "credit_card" }
    await axios.post(`${BASE_URL}/transactions`, transaction)

    const { data: transactionDb }= await axios.get(`${BASE_URL}/transactions/${code}`)

    expect(transactionDb.amount).toBe("1000")
    expect(transactionDb.numberInstallments).toBe(12)
    expect(transactionDb.paymentMethod).toBe("credit_card")
})
