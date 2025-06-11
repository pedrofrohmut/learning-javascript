import Ticket from "./ticket"

class TicketsService {
    constructor() {}

    async createTicket(requesterId: string, content: string) {
        const newTicket = Ticket.create(requesterId, content)
        await newTicket.save()
        return newTicket.ticketId
    }

    async assignTicket(ticketId: string, assigneeId: string) {
        const ticket = await Ticket.load(ticketId)
        ticket.assign(assigneeId)
        await ticket.update()
    }

    async closeTicket(ticketId: string) {
        const ticket = await Ticket.load(ticketId)
        ticket.close()
        await ticket.update()
    }

    async getTicket(ticketId: string) {
        return await Ticket.load(ticketId)
    }
}

export default TicketsService
