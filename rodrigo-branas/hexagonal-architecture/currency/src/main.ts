import express from "express"

const app = express()

app.get("/currencies", (_req, res) => res.json({ usd: 3 }))

app.listen(5001, () => console.log("Currency server started at http://localhost:5001"))
