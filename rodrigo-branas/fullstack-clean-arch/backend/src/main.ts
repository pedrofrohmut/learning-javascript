import express from "express"
import cors from "cors"

const serverPort = 5000

const main = async () => {
    const app = express()

    app.use(cors())

    app.get("/products", (_req: express.Request, res: express.Response) => {
        res.status(200).json([
            { productId: 1, description: "A", price: 100 },
            { productId: 2, description: "B", price: 200 },
            { productId: 3, description: "C", price: 400 }
        ])
    })

    app.listen(serverPort, () => console.log(`Server started at http://localhost:${serverPort}`))
}

main()
