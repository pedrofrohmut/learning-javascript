import express from "express"
import TicketsService from "./tickets-service"

const app = express()

app.use(express.json())

app.post("/tickets", async (req, res) => {
    const ticketId = await new TicketsService().createTicket(req.body.requesterId, req.body.content)
    res.json({ ticketId })
})

app.get("/tickets/:ticketId", async (req, res) => {
    const ticket = await new TicketsService().getTicket(req.params.ticketId)
    res.json(ticket)
})

app.post("/tickets/:ticketId/assign", async (req, res) => {
    const ticketsService = new TicketsService()
    await ticketsService.assignTicket(req.params.ticketId, req.body.assigneeId)
    res.end()
})

app.post("/tickets/:ticketId/close", async (req, res) => {
    const ticketsService = new TicketsService()
    await ticketsService.closeTicket(req.params.ticketId)
    res.end()
})

app.listen(5000)
