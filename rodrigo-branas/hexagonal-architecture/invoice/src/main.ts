import express from "express"

const app = express()

app.get("/cards/:cardNumber/invoices", (req, res) => {
    res.json({
        total: 1000
    })
})

app.listen(3000, () => console.log("Server started on http://localhost:3000"))
