import express from "express"
import crypto from "crypto"
import pgp from "pg-promise"

const app = express()

app.use(express.json())

app.post("/tickets", async (req, res) => {
    const connection = pgp()("postgres://postgres:password@localhost:5108")

    const ticketId = crypto.randomUUID()
    await connection.query(
        "insert into tickets (ticket_id, requester_id, content, start_date, status) values ($1, $2, $3, $4, $5)",
        [ticketId, req.body.requesterId, req.body.content, new Date(), "open"]
    )

    await connection.$pool.end()

    res.json({ ticketId })
})

app.get("/tickets/:ticketId", async (req, res) => {
    const connection = pgp()("postgres://postgres:password@localhost:5108")

    const [ticketData] = await connection.query("select * from tickets where ticket_id = $1", [
        req.params.ticketId
    ])

    await connection.$pool.end()

    res.json({
        ticketId: ticketData.ticket_id,
        requesterId: ticketData.requester_id,
        assigneeId: ticketData.assignee_id,
        startDate: ticketData.start_date,
        status: ticketData.status,
        content: ticketData.content,
        endDate: ticketData.end_date,
        duration: ticketData.duration
    })
})

app.post("/tickets/:ticketId/assign", async (req, res) => {
    const connection = pgp()("postgres://postgres:password@localhost:5108")

    const [ticket] = await connection.query("select * from tickets where ticket_id = $1", [
        req.params.ticketId
    ])
    if (ticket.status === "closed") {
        throw new Error("This ticket cannot be assigned, because it is already closed.")
    }

    await connection.query(
        "update tickets set status = $1, assignee_id = $2 where ticket_id = $3",
        [req.body.status, req.body.assigneeId, req.params.ticketId]
    )

    await connection.$pool.end()

    res.end()
})

app.post("/tickets/:ticketId/close", async (req, res) => {
    const connection = pgp()("postgres://postgres:password@localhost:5108")

    const [ticket] = await connection.query("select * from tickets where ticket_id = $1", [
        req.params.ticketId
    ])
    if (ticket.status === "open") {
        throw new Error("This ticket is open. Cannot close a ticket that was not assigned.")
    }

    const endDate = new Date()
    const duration = endDate.getTime() - ticket.start_date.getTime()
    await connection.query(
        "update tickets set status = $1, duration = $2, end_date = $3  where ticket_id = $4",
        [req.body.status, duration, endDate, req.params.ticketId]
    )

    await connection.$pool.end()

    res.end()
})

app.listen(5000)
