import Ticket from "../src/3/ticket"

test("Should create a ticket", () => {
    const ticket = Ticket.create("requesterId", "content")
    expect(ticket.ticketId).toBeDefined()
    expect(ticket.requesterId).toBe("requesterId")
    expect(ticket.content).toBe("content")
    expect(ticket.startDate).toBeDefined()
    expect(ticket.status).toBe("open")
})
