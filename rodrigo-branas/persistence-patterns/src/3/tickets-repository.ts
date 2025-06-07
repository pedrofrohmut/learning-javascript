import Ticket from "./ticket"

interface TicketsRepository {
    save(ticket: Ticket): Promise<void>
    update(ticket: Ticket): Promise<void>
    get(ticketId: string): Promise<Ticket>
}

export default TicketsRepository
