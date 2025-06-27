import express, { Request, Response } from "express"
import crypto from "crypto"
const types = require("pg").types
import { WebSocketServer } from "ws"

import AuctionRepositoryDatabase from "../clean-design/auction-repository-database"
import BidRepositoryDatabase from "../clean-design/bid-repository-database"
import PgDatabaseConnection from "../clean-design/pg-database-connection"

// Configure pg-types to return numeric as float
types.setTypeParser(types.builtins.NUMERIC, parseFloat)
types.setTypeParser(types.builtins.INT8, parseInt)
types.setTypeParser(types.builtins.FLOAT8, parseFloat)
types.setTypeParser(types.builtins.INT4, parseInt)
types.setTypeParser(types.builtins.FLOAT4, parseFloat)

const app = express()

const wss = new WebSocketServer({ port: 8080 })
const connections: any = []

wss.on("connection", (ws) => {
    connections.push(ws)
})

// Middlewares
app.use(express.json())

const databaseConnection = new PgDatabaseConnection()
const auctionRepository = new AuctionRepositoryDatabase(databaseConnection)
const bidRepository = new BidRepositoryDatabase(databaseConnection)

// Create auction endpoint
app.post("/auctions", async (req: Request, res: Response) => {
    const auction = req.body
    auction.auctionId = crypto.randomUUID()
    try {
        await auctionRepository.save(auction)
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
        const result = await auctionRepository.get(auctionId)
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
        const result = await bidRepository.getHighestByAuctionId(auctionId)
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

    // Check auction exists
    const auctionDb = await auctionRepository.get(bid.auctionId)
    if (!auctionDb) {
        throw new Error("Auction not found")
    }

    // Get highest bid
    const highestBid = await bidRepository.getHighestByAuctionId(auctionDb.auction_id)

    // Validate bid customer
    if (highestBid && bid.customer === highestBid.customer) {
        res.status(400)
        res.send("Invalid customer. The highest bid customer cannot place new bids.")
        return
    }

    // Validate bid amount
    let validBidAmount = 0
    if (highestBid) {
        validBidAmount = highestBid.amount + auctionDb.min_increment
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
        await bidRepository.save(bid)
    } catch (err: any) {
        console.error("Create Bid Error: " + err.message)
        res.status(500)
        res.send("Error trying to create a new bid")
        return
    }

    for (const connection of connections) {
        connection.send(Buffer.from(JSON.stringify(bid)))
    }

    res.json({ bidId: bid.bidId })
})

app.listen(5000)
