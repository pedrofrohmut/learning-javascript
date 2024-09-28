import express, { Request, Response } from "express"
import pgp from "pg-promise"
import { v4 as uuidv4 } from "uuid"

const dbContext = pgp()("postgres://postgres:password@localhost:5105")

const app = express()

// Middleware to parse the request body when it is on json format
app.use(express.json())

app.post("/transactions", async (req: Request, res: Response) => {
    await dbContext.query(
        `INSERT INTO transactions (id, code, value, number_installments, payment_method)
         VALUES ($1, $2, $3, $4, $5)`,
        [uuidv4(), req.body.code, req.body.value, req.body.numberInstallments, req.body.paymentMethod]
    )

    const addingInstallments = []
    const N = req.body.numberInstallments
    const total = req.body.value
    const portion = parseFloat((total / N).toFixed(2))
    const extraFromRounding = parseFloat((total - portion * N).toFixed(2))

    for (let i = 1; i <= N; i++) {
        const value = i == N ? portion + extraFromRounding : portion
        const addInstallment = dbContext.query(
            `INSERT INTO installments (id, number, value, transaction_code) VALUES ($1, $2, $3, $4)`,
            [uuidv4(), i, value, req.body.code]
        )
        addingInstallments.push(addInstallment)
    }

    await Promise.all(addingInstallments)

    res.end()
})

app.get("/transactions/:code", async (req: Request, res: Response) => {
    const rows = await dbContext.query(
        "SELECT id, code, value, number_installments, payment_method, created_at FROM transactions WHERE code = $1",
        [req.params.code]
    )

    if (rows.length < 1) {
        res.status(404)
        res.send("No transaction found")
        return
    }

    const installmentsRows = await dbContext.query(
        "SELECT id, number, value, transaction_code FROM installments WHERE transaction_code = $1",
        [req.params.code]
    )
    const installments: any[] = []
    for (let i = 0; i < installmentsRows.length; i++) {
        const x = installmentsRows[i]
        installments.push({
            id: x.id,
            value: parseFloat(x.value),
            number: parseInt(x.number),
            transactionCode: x.transaction_code
        })
    }

    const transaction = rows[0]
    res.json({
        id: transaction.id,
        code: transaction.code,
        value: transaction.value,
        numberInstallments: transaction.number_installments,
        paymentMethod: transaction.payment_method,
        createdAt: transaction.created_at,
        installments
    })
})

app.listen(3000)
