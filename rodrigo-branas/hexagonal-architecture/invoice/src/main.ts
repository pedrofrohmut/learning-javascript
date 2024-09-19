import express from "express"
import pgPromise from "pg-promise"
import pg from "pg-promise/typescript/pg-subset"

import CalcutateInvoiceUseCase from "./usecases/calculate-invoice-usecase"
import TransactionsDao from "./daos/transactions-dao"
import CurrencyGateway from "./gateways/currency-gateway"
import HttpClient from "./gateways/http-client"

export type DbContext = pgPromise.IDatabase<{}, pg.IClient>

const app = express()
const pgp = pgPromise()
const dbContext: DbContext = pgp("postgres://postgres:password@localhost:5101/postgres")

app.get("/cards/:cardNumber/invoices", async (req, res) => {
    const transactionsDao = new TransactionsDao(dbContext)
    const httpClient = new HttpClient()
    const currencyGateway = new CurrencyGateway(httpClient)
    const calculateInvoiceUseCase = new CalcutateInvoiceUseCase(transactionsDao, currencyGateway)
    const total = await calculateInvoiceUseCase.execute(req.params.cardNumber)
    res.json({ total })
})

app.listen(5000, () => console.log("Server started on http://localhost:5000"))
