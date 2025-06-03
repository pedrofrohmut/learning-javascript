import axios from "axios"

const BASE_URL = "http://localhost:5000/tickets"

test("Should create a new ticket", async () => {
    // Request Data
    const input1 = {
        requesterId: "ebd9aa7c-2be2-4439-ad9a-2c16ea568bda",
        content: "The internet is too slow"
    }

    // Create new ticket
    const response = await axios.post(BASE_URL, input1)
    const output = response.data

    // Read the ticket newly created
    const response2 = await axios.get(`${BASE_URL}/${output.ticketId}`)
    const output2 = response2.data

    // Validate response ticket
    expect(output2.ticketId).toBeDefined()
    expect(output2.requesterId).toBe(input1.requesterId)
    expect(output2.content).toBe(input1.content)
    expect(output2.status).toBe("open")
})

test("Should assign a ticket to an attendant", async () => {
    const input1 = {
        requesterId: "ebd9aa7c-2be2-4439-ad9a-2c16ea568bda",
        content: "The internet is too slow"
    }
    const { data: output1 } = await axios.post(BASE_URL, input1)

    const input2 = {
        assigneeId: "840580b4-3653-4fcd-87cb-12c46d1aabd4",
        status: "assignned"
    }
    await axios.put(`${BASE_URL}/${output1.ticketId}`, input2)

    const { data: output3 } = await axios.get(`${BASE_URL}/${output1.ticketId}`)

    expect(output3.assigneeId).toBe(input2.assigneeId)
    expect(output3.status).toBe(input2.status)
})
