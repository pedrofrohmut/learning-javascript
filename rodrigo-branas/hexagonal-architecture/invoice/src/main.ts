import express from "express"
import pgPromise from "pg-promise"
import axios from "axios"

const app = express()
const pgp = pgPromise()
const dbContext = pgp("postgres://postgres:password@localhost:5101/postgres")

app.get("/cards/:cardNumber/invoices", async (req, res) => {
    const { data: currencies } = await axios.get("http://localhost:5001/currencies")

    // Hard coded here so that i dont have to change the data on database
    //const now = new Date()
    const currMonth = 11 //now.getMonth()
    const currYear = 2022 //now.getFullYear()

    const cardTransactions = await dbContext.query(
        `select *
             from card_transactions
             where card_number = $1
             and extract(month from date) = $2
             and extract(year from date) = $3`,
        [req.params.cardNumber, currMonth, currYear]
    )

    const total = cardTransactions.reduce(
        (acc: number, x: any) =>
            acc + (x.currency == "USD" ? currencies.usd : 1) * parseFloat(x.amount),
        0
    )

    res.json({ total })
})

app.listen(5000, () => console.log("Server started on http://localhost:5000"))
