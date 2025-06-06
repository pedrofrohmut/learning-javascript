import crypto from "crypto"
import TicketsDaoDatabase from "./tickets-dao-database"
import TicketsDao from "./tickets-dao"

class TicketsService {
    private ticketsDao: TicketsDao

    constructor() {
        this.ticketsDao = new TicketsDaoDatabase()
    }

    async createTicket(requesterId: string, content: string) {
        const ticketId = crypto.randomUUID()
        const newTicket = { ticketId, requesterId, content, startDate: new Date(), status: "open" }
        await this.ticketsDao.save(newTicket)
        return ticketId
    }

    async assignTicket(ticketId: string, assigneeId: string) {
        const ticket = await this.ticketsDao.get(ticketId)
        if (ticket.status === "closed") {
            throw new Error("This ticket cannot be assigned, because it is already closed.")
        }
        ticket.assigneeId = assigneeId
        ticket.status = "assigned"
        await this.ticketsDao.update(ticket)
    }

    async closeTicket(ticketId: string) {
        const ticket = await this.ticketsDao.get(ticketId)
        if (ticket.status === "open") {
            throw new Error("This ticket is open. Cannot close a ticket that was not assigned.")
        }
        ticket.endDate = new Date()
        ticket.duration = ticket.endDate.getTime() - ticket.startDate.getTime()
        ticket.status = "closed"
        await this.ticketsDao.update(ticket)
    }

    async getTicket(ticketId: string) {
        return await this.ticketsDao.get(ticketId)
    }
}

export default TicketsService
