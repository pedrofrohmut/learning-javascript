import axios from "axios"
import { v4 as uuidv4 } from "uuid"

const BASE_URL = "http://localhost:3000"

test("Should create a transaction", async () => {
    const code = uuidv4()
    const requestBody = { code, value: 1000, numberInstallments: 12, paymentMethod: "credit_card" }
    const createResponse = await axios.post(`${BASE_URL}/transactions`, requestBody)

    expect(createResponse.status).toBe(201)

    const getResponse = await axios.get(`${BASE_URL}/transactions/${code}`)

    expect(getResponse.status).toBe(200)

    const transaction = getResponse.data

    expect(transaction.value).toBe(1000)
    expect(transaction.numberInstallments).toBe(12)
    expect(transaction.paymentMethod).toBe("credit_card")

    expect(transaction.installments).toHaveLength(12)
    const first = transaction.installments.find((x: any) => x.number == 1)
    expect(first?.value).toBe(83.33)
    const last = transaction.installments.find((x: any) => x.number == 12)
    expect(last?.value).toBe(83.37)
})

test("Should use the same instance all the times it is called", async () => {
    const code = uuidv4()
    const requestBody = { code, value: 1000, numberInstallments: 12, paymentMethod: "credit_card" }
    const createResponse = await axios.post(`${BASE_URL}/transactions`, requestBody)

    expect(createResponse.status).toBe(201)

    const getResponse1 = await axios.get(`${BASE_URL}/transactions/${code}`)
    expect(getResponse1.status).toBe(200)

    const getResponse2 = await axios.get(`${BASE_URL}/transactions/${code}`)
    expect(getResponse2.status).toBe(200)

    const getResponse3 = await axios.get(`${BASE_URL}/transactions/${code}`)
    expect(getResponse3.status).toBe(200)

    const getResponse4 = await axios.get(`${BASE_URL}/transactions/${code}`)
    expect(getResponse4.status).toBe(200)

    const getResponse5 = await axios.get(`${BASE_URL}/transactions/${code}`)
    expect(getResponse5.status).toBe(200)
})
