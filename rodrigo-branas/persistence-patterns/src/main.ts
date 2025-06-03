import express from "express"
import crypto from "crypto"
import pgp from "pg-promise"

const app = express()

app.use(express.json())

app.post("/tickets", async (req, res) => {
    const ticketId = crypto.randomUUID()
    const connection = pgp()("postgres://postgres:password@localhost:5108")
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
        content: ticketData.content
    })
})

app.put("/tickets/:ticketId", async (req, res) => {
    const connection = pgp()("postgres://postgres:password@localhost:5108")
    await connection.query(
        "update tickets set status = $1, assignee_id = $2 where ticket_id = $3",
        [req.body.status, req.body.assigneeId, req.params.ticketId]
    )
    await connection.$pool.end()
    res.end()
})

app.listen(5000)
