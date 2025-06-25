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

    // Check bid exists
    const [auctionDb] = await connection.query("select * from auctions where auction_id = $1", [
        bid.auctionId
    ])
    if (!auctionDb) {
        throw new Error("Auction not found")
    }

    // Validate bid amount
    const [highestBidDb] = await connection.query(
        "select * from bids where auction_id = $1 order by amount desc limit 1",
        [auctionDb.auction_id]
    )
    let validBidAmount = 0
    if (highestBidDb) {
        validBidAmount = highestBidDb.amount + auctionDb.min_increment
    } else {
        validBidAmount = auctionDb.start_amount
    }
    if (bid.amount < validBidAmount) {
        res.status(400)
        res.send("The bid amount is too low. Bid must be at least 1010.")
        return
    }

    // Validate bid date
    const bidDate = new Date(bid.date).getTime()
    const startDate = new Date(auctionDb.start_date).getTime()
    const endDate = new Date(auctionDb.end_date).getTime()
    if (bidDate < startDate) {
        res.status(422)
        res.send("Too early. Auction is not opened yet.")
        return
    }
    if (bidDate >= endDate) {
        res.status(422)
        res.send("Too late. Auction is already closed.")
        return
    }

    // Insert new bid
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
