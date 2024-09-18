import axios from "axios"

const BASE_URL = "http://localhost:5000"

test("", async () => {
    const response = await axios.get(`${BASE_URL}/cards/1234/invoices`)
    expect(response.status).toBe(200)
    expect(response.data.total).toBe(1050)
})
