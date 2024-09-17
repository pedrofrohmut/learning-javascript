import axios from "axios"

test("", async () => {
    const { data: invoice } = await axios.get("http://localhost:3000/cards/1234/invoices")
    expect(invoice.total).toBe(1050)
})
