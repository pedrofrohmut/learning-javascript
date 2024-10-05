import express, { Request, Response, Express } from "express"

import IHttpServer from "./ihttp-server"

class ExpressHttpServer implements IHttpServer {
    private readonly app: Express

    constructor() {
        this.app = express()

        // Middleware to parse the request body when it is on json format
        this.app.use(express.json())
    }

    on(method: string, url: string, callback: Function): void {
        switch (method) {
            case "GET":
                this.app.get(url, async (req, res) => {
                    const result = await callback(req.params, req.body)
                    res.status(200)
                    res.json(result)
                })
                break
            case "POST":
                this.app.post(url, async (req, res) => {
                    await callback(req.params, req.body)
                    res.status(201)
                    res.end()
                })
                break
        }
    }

    listen(port: number): void {
        this.app.listen(port)
    }
}

export default ExpressHttpServer
