import pgp from "pg-promise"

import TicketsDao from "./tickets-dao"

class TicketsDaoDatabase implements TicketsDao {
    async save(ticket: any): Promise<void> {
        const connection = pgp()("postgres://postgres:password@localhost:5108")
        await connection.query(
            "insert into tickets (ticket_id, requester_id, content, start_date, status) values ($1, $2, $3, $4, $5)",
            [ticket.ticketId, ticket.requesterId, ticket.content, ticket.startDate, ticket.status]
        )
        await connection.$pool.end()
    }

    async update(ticket: any): Promise<void> {
        const connection = pgp()("postgres://postgres:password@localhost:5108")
        await connection.query(
            "update tickets set status = $1, assignee_id = $2, end_date = $3, duration = $4 where ticket_id = $5",
            [ticket.status, ticket.assigneeId, ticket.endDate, ticket.duration, ticket.ticketId]
        )
        await connection.$pool.end()
    }

    async get(ticketId: string): Promise<any> {
        const connection = pgp()("postgres://postgres:password@localhost:5108")
        const [ticket] = await connection.query("select * from tickets where ticket_id = $1", [
            ticketId
        ])
        await connection.$pool.end()
        return {
            ticketId: ticket.ticket_id,
            requesterId: ticket.requester_id,
            assigneeId: ticket.assignee_id,
            startDate: ticket.start_date,
            endDate: ticket.end_date,
            content: ticket.content,
            status: ticket.status,
            duration: ticket.duration
        }
    }
}

export default TicketsDaoDatabase
