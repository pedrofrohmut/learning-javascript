import crypto from "crypto"
import pgp from "pg-promise"

class Ticket {
    ticketId?: string
    requesterId?: string
    assigneeId?: string
    startDate?: Date
    endDate?: Date
    content?: string
    status?: string
    duration?: number

    private constructor() {}

    static create(requesterId: string, content: string) {
        const ticket = new Ticket()
        ticket.ticketId = crypto.randomUUID()
        ticket.requesterId = requesterId
        ticket.assigneeId = undefined
        ticket.startDate = new Date()
        ticket.endDate = undefined
        ticket.content = content
        ticket.status = "open"
        ticket.duration = undefined
        return ticket
    }

    public assign(assigneeId: string) {
        if (this.status === "closed") {
            throw new Error("This ticket cannot be assigned, because it is already closed.")
        }
        this.assigneeId = assigneeId
        this.status = "assigned"
    }

    public close() {
        if (this.status === "open" || !this.startDate || !this.assigneeId) {
            throw new Error("This ticket is open. Cannot close a ticket that was not assigned.")
        }
        this.endDate = new Date()
        this.duration = this.endDate.getTime() - this.startDate.getTime()
        this.status = "closed"
    }

    static async load(ticketId: string) {
        const connection = pgp()("postgres://postgres:password@localhost:5108")

        const [result1] = await connection.query("select * from tickets where ticket_id = $1", [
            ticketId
        ])

        const ticket = new Ticket()
        ticket.ticketId = result1.ticket_id
        ticket.requesterId = result1.requester_id
        ticket.assigneeId = result1.assignee_id
        ticket.startDate = result1.start_date
        ticket.endDate = result1.end_date
        ticket.content = result1.content
        ticket.status = result1.status
        ticket.duration = result1.duration

        await connection.$pool.end()

        return ticket
    }

    async update () {
        const connection = pgp()("postgres://postgres:password@localhost:5108")
        await connection.query(
            "update tickets set status = $1, assignee_id = $2, end_date = $3, duration = $4 where ticket_id = $5",
            [this.status, this.assigneeId, this.endDate, this.duration, this.ticketId]
        )
        await connection.$pool.end()
    }

    async save() {
        const connection = pgp()("postgres://postgres:password@localhost:5108")
        await connection.query(
            "insert into tickets (ticket_id, requester_id, content, start_date, status) values ($1, $2, $3, $4, $5)",
            [this.ticketId, this.requesterId, this.content, this.startDate, this.status]
        )
        await connection.$pool.end()
    }
}

export default Ticket
