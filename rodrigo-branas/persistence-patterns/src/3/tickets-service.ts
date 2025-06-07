import Ticket from "./ticket"
import TicketsRepository from "./tickets-repository"
import TicketsRepositoryDatabase from "./tickets-repository-database"

class TicketsService {
    private ticketsRepository: TicketsRepository

    constructor() {
        this.ticketsRepository = new TicketsRepositoryDatabase()
    }

    async createTicket(requesterId: string, content: string) {
        const newTicket = Ticket.create(requesterId, content)
        await this.ticketsRepository.save(newTicket)
        return newTicket.ticketId
    }

    async assignTicket(ticketId: string, assigneeId: string) {
        const ticket = await this.ticketsRepository.get(ticketId)
        ticket.assign(assigneeId)
        await this.ticketsRepository.update(ticket)
    }

    async closeTicket(ticketId: string) {
        const ticket = await this.ticketsRepository.get(ticketId)
        ticket.close()
        await this.ticketsRepository.update(ticket)
    }

    async getTicket(ticketId: string) {
        return await this.ticketsRepository.get(ticketId)
    }
}

export default TicketsService
