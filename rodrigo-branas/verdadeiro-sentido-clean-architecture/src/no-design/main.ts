import express, { Request, Response } from "express"
import crypto from "crypto"
import pgp from "pg-promise"
const types = require("pg").types

import { postgres_string } from "../constants"

// Configure pg-types to return numeric as float
types.setTypeParser(types.builtins.NUMERIC, parseFloat)
types.setTypeParser(types.builtins.INT8, parseInt)
types.setTypeParser(types.builtins.FLOAT8, parseFloat)
types.setTypeParser(types.builtins.INT4, parseInt)
types.setTypeParser(types.builtins.FLOAT4, parseFloat)

const connection = pgp()(postgres_string)

const app = express()

// Middlewares
app.use(express.json())

// Create auction endpoint
app.post("/auctions", async (req: Request, res: Response) => {
    const auction = req.body
    auction.auctionId = crypto.randomUUID()
    try {
        await connection.query(
            `insert into auctions (auction_id, start_date, end_date, min_increment, start_amount) values ($1, $2, $3, $4, $5)`,
            [
                auction.auctionId,
                auction.startDate,
                auction.endDate,
                auction.minIncrement,
                auction.startAmount
            ]
        )
    } catch (err: any) {
        console.error("Create Auction Error: " + err.message)
        res.status(500)
        res.send("Error trying to create a new auction")
        return
    }
    res.json({ auctionId: auction.auctionId })
})

// Get auction endpoint
app.get("/auctions/:auctionId", async (req: Request, res: Response) => {
    const auctionId = req.params.auctionId

    let auctionDb = null
    try {
        const [result] = await connection.query(`select * from auctions where auction_id = $1`, [
            auctionId
        ])
        auctionDb = result
    } catch (err: any) {
        console.error("Get Auction Error: " + err.message)
        res.status(500)
        res.send("Error trying to get a auction")
    }
    if (!auctionDb) {
        throw new Error("Auction not found")
    }

    let highestBid = null
    try {
        const [result] = await connection.query(
            `select * from bids where auction_id = $1 order by amount desc limit 1`,
            [auctionId]
        )
        if (result) {
            highestBid = {
                bidId: result.bid_id,
                auctionId,
                customer: result.customer,
                amount: result.amount,
                createdAt: result.created_at
            }
        }
    } catch (err: any) {
        console.error("Get Highest Bid Error: " + err.message)
        res.status(500)
        res.send("Error trying to get the highest bid")
    }

    res.json({
        auctionId,
        startDate: auctionDb.start_date,
        endDate: auctionDb.end_date,
        minIncrement: auctionDb.min_increment,
        startAmount: auctionDb.start_amount,
        highestBid
    })
})

// Create bids endpoint
app.post("/bids", async (req: Request, res: Response) => {
    const bid = req.body
    bid.bidId = crypto.randomUUID()

    const [auction] = await connection.query(`select * from auctions where auction_id = $1`, [
        bid.auctionId
    ])
    if (!auction) {
        throw new Error("Auction not found")
    }

    try {
        await connection.query(
            `insert into bids (bid_id, auction_id, customer, amount, created_at) values ($1, $2, $3, $4, $5)`,
            [bid.bidId, bid.auctionId, bid.customer, bid.amount, bid.date]
        )
    } catch (err: any) {
        console.error("Create Bid Error: " + err.message)
        res.status(500)
        res.send("Error trying to create a new bid")
        return
    }

    res.json({ bidId: bid.bidId })
})

app.listen(5000)
