import express, { Request, Response } from "express"
import pgp from "pg-promise"
import { v4 as uuidv4 } from "uuid"

const dbContext = pgp()("postgres://postgres:password@localhost:5105")

const app = express()

// Middleware to parse the request body when it is on json format
app.use(express.json())

app.post("/transactions", async (req: Request, res: Response) => {
    const id = uuidv4()

    await dbContext.query(
        `INSERT INTO transactions (id, code, amount, number_installments, payment_method)
         VALUES ($1, $2, $3, $4, $5)`,
        [id, req.body.code, req.body.amount, req.body.numberInstallments, req.body.paymentMethod]
    )

    res.end()
})

app.get("/transactions/:code", async (req: Request, res: Response) => {
    const rows = await dbContext.query("SELECT * FROM transactions WHERE code = $1", [req.params.code])

    if (rows.length < 1) {
        res.status(404)
        res.send("No transaction found")
        return
    }

    const x = rows[0]
    const output = {
        id: x.id,
        code: x.code,
        amount: x.amount,
        numberInstallments: x.number_installments,
        paymentMethod: x.payment_method,
        createdAt: x.created_at
    }

    res.json(output)
})

app.listen(3000)
