import axios from "axios"

const BASE_URL = "http://localhost:5000"

test("Should create a new ticket", async () => {
    // Request Data
    const input = {
        requesterId: "ebd9aa7c-2be2-4439-ad9a-2c16ea568bda",
        content: "The internet is too slow"
    }

    // Create new ticket
    const { data: output } = await axios.post(`${BASE_URL}/tickets`, input)

    // Validate newly created ticket
    const { data: output2 } = await axios.get(`${BASE_URL}/tickets/${output.ticketId}`)
    expect(output2.ticketId).toBeDefined()
    expect(output2.requesterId).toBe(input.requesterId)
    expect(output2.content).toBe(input.content)
    expect(output2.status).toBe("open")
})

test("Should assign a ticket to an attendant", async () => {
    // Create new ticket
    const input1 = {
        requesterId: "ebd9aa7c-2be2-4439-ad9a-2c16ea568bda",
        content: "The internet is too slow"
    }
    const { data: output1 } = await axios.post(`${BASE_URL}/tickets`, input1)

    // Assign to the ticket an attendant
    const input2 = {
        assigneeId: "840580b4-3653-4fcd-87cb-12c46d1aabd4",
        status: "assigned"
    }
    await axios.post(`${BASE_URL}/tickets/${output1.ticketId}/assign`, input2)

    // Check if the ticket created has the assigned attendant
    const { data: output3 } = await axios.get(`${BASE_URL}/tickets/${output1.ticketId}`)
    expect(output3.assigneeId).toBe(input2.assigneeId)
    expect(output3.status).toBe(input2.status)
})

test("Should close a ticket", async () => {
    // Create new ticket
    const input1 = {
        requesterId: "ebd9aa7c-2be2-4439-ad9a-2c16ea568bda",
        content: "The internet is too slow"
    }
    const { data: output1 } = await axios.post(`${BASE_URL}/tickets`, input1)

    // Assign to the ticket an attendant
    const input2 = {
        assigneeId: "840580b4-3653-4fcd-87cb-12c46d1aabd4",
        status: "assigned"
    }
    await axios.post(`${BASE_URL}/tickets/${output1.ticketId}/assign`, input2)

    // Close the ticket
    const input3 = {
        status: "closed"
    }
    await axios.post(`${BASE_URL}/tickets/${output1.ticketId}/close`, input3)

    // Check if the ticket created has the assigned attendant and status 'closed'
    const { data: output2 } = await axios.get(`${BASE_URL}/tickets/${output1.ticketId}`)
    expect(output2.assigneeId).toBe(input2.assigneeId)
    expect(output2.endDate).toBeDefined()
    expect(output2.duration).toBeDefined()
    expect(output2.status).toBe(input3.status)
})
