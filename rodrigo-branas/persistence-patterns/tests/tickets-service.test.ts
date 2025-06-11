import TicketsService from "../src/daos/tickets-service"

test("Should create a new ticket", async () => {
    const service = new TicketsService()

    // Create new ticket
    const newTicket = {
        requesterId: "ebd9aa7c-2be2-4439-ad9a-2c16ea568bda",
        content: "The internet is too slow"
    }
    const ticketId = await service.createTicket(newTicket.requesterId, newTicket.content)

    // Validate newly created ticket
    const ticket = await service.getTicket(ticketId)
    expect(ticket.ticketId).toBe(ticketId)
    expect(ticket.requesterId).toBe(newTicket.requesterId)
    expect(ticket.content).toBe(newTicket.content)
    expect(ticket.startDate).toBeDefined()
    expect(ticket.status).toBe("open")
})

test("Should assign a ticket to an attendant", async () => {
    const service = new TicketsService()

    // Create new ticket
    const newTicket = {
        requesterId: "ebd9aa7c-2be2-4439-ad9a-2c16ea568bda",
        content: "The internet is too slow"
    }
    const ticketId = await service.createTicket(newTicket.requesterId, newTicket.content)

    // Assign to the ticket an attendant
    const assigneeId = "840580b4-3653-4fcd-87cb-12c46d1aabd4"
    await service.assignTicket(ticketId, assigneeId)

    // Check if the ticket created has the assigned attendant
    const assignedTicket = await service.getTicket(ticketId)
    expect(assignedTicket.assigneeId).toBe(assigneeId)
    expect(assignedTicket.status).toBe("assigned")
})

test("Should close a ticket", async () => {
    const service = new TicketsService()

    // Create new ticket
    const newTicket = {
        requesterId: "ebd9aa7c-2be2-4439-ad9a-2c16ea568bda",
        content: "The internet is too slow"
    }
    const ticketId = await service.createTicket(newTicket.requesterId, newTicket.content)

    // Assign to the ticket an attendant
    const assigneeId = "840580b4-3653-4fcd-87cb-12c46d1aabd4"
    await service.assignTicket(ticketId, assigneeId)

    // Close the ticket
    await service.closeTicket(ticketId)

    // Check if the ticket created has the assigned attendant and status 'closed'
    const ticket = await service.getTicket(ticketId)
    expect(ticket.assigneeId).toBe(assigneeId)
    expect(ticket.endDate).toBeDefined()
    expect(ticket.duration).toBeDefined()
    expect(ticket.status).toBe("closed")
})
