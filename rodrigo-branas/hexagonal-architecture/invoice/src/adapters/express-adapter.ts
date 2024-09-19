import { Server } from "http"
import express, { Express } from "express"

import IHttpServer from "../application/ihttp-server"

class ExpressAdapter implements IHttpServer {
    private readonly application: Express

    constructor() {
        this.application = express()
    }

    addRoute(method: string, url: string, callback: Function): void {
        switch (method.toUpperCase()) {
            case "GET":
                this.application.get(url, async (req, res) => {
                    const output = await callback(req.params, req.body)
                    return res.json(output)
                })
                break
        }
    }

    listen(port: number, message?: string): Server {
        if (message) {
            return this.application.listen(port, () => console.log(message))
        } else {
            return this.application.listen(port)
        }
    }
}

export default ExpressAdapter
