import express, { Application } from "express"
import cors from "cors"
import mongoose from "mongoose"

class App {
  public express: Application

  public constructor() {
    this.express = express()
    this.connectToDatabase()
    this.setupMiddlewares()
    this.setupRoutes()
  }

  private connectToDatabase(): void {
    mongoose.connect("mongodb://localhost:27017/rocketseat_db")
  }

  private setupMiddlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private setupRoutes(): void {
    this.express.get("/", (_req, res) => {
      res.status(200)
      res.json({ message: "Hello, World!" })
    })
  }
}

export default new App().express
