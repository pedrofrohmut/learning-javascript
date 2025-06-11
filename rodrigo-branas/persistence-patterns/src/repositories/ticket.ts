import crypto from "crypto"

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

    static restore(builder: any) {
        const ticket = new Ticket()
        ticket.ticketId = builder.ticketId
        ticket.requesterId = builder.requesterId
        ticket.assigneeId = builder.assigneeId
        ticket.startDate = builder.startDate
        ticket.endDate = builder.endDate
        ticket.content = builder.content
        ticket.status = builder.status
        ticket.duration = builder.duration
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
}

export default Ticket
