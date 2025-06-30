import express, { Request, Response } from "express"
const types = require("pg").types
import { WebSocketServer } from "ws"

import AuctionRepositoryDatabase from "../clean-design/auction-repository-database"
import BidRepositoryDatabase from "../clean-design/bid-repository-database"
import PgDatabaseConnection from "../clean-design/pg-database-connection"
import CreateAuctionUseCase from "./create-auction-usecase"
import GetAuctionByIdUseCase from "./get-auction-by-id-usecase"
import MakeBidUseCase from "./create-bid-usecase"

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
const auctionRepository = AuctionRepositoryDatabase.getInstance(databaseConnection)
const bidRepository = BidRepositoryDatabase.getInstance(databaseConnection)

// Create auction endpoint
app.post("/auctions", async (req: Request, res: Response) => {
    const createAuctionUseCase = new CreateAuctionUseCase(auctionRepository)
    try {
        const result = await createAuctionUseCase.execute(req.body)
        res.status(201)
        res.json(result)
        return
    } catch (err: any) {
        console.error("Create Auction Error: " + err.message)
        res.status(500)
        res.send("Error trying to create a new auction")
        return
    }
})

// Get auction endpoint
app.get("/auctions/:auctionId", async (req: Request, res: Response) => {
    const getAuctionByIdUseCase = new GetAuctionByIdUseCase(auctionRepository, bidRepository)
    try {
        const auction = await getAuctionByIdUseCase.execute(req.params.auctionId)
        res.status(200)
        res.json(auction)
    } catch (err: any) {
        res.status(500)
        res.send(err.message)
    }
})

// Create bids endpoint
app.post("/bids", async (req: Request, res: Response) => {
    const makeBidUseCase = new MakeBidUseCase(auctionRepository, bidRepository)
    try {
        const result = await makeBidUseCase.execute(req.body, connections)
        res.status(201)
        res.json(result)
    } catch (err: any) {
        res.status(500)
        res.send(err.message)
    }
})

app.listen(5000)
