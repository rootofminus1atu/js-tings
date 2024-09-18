import express, { Application, Request, Response } from "express"
import { createWave } from "./wave"
import morgan from "morgan"

const PORT = process.env.PORT || 3000
const app: Application = express()

app.use(morgan("tiny"))

app.get("/ping", async (_req: Request, res: Response) => {
    res.send({
        message: "pong"
    })
})

app.get("/bananas", async (_req: Request, res: Response) => {
    res.send({
        message: "thats a lotta bananas"
    })
})

app.get("/wave/:text?", async (req: Request, res: Response) => {
    const text = req.params["text"] || "wave"
    const wave = createWave(
        text, 40, 15, 2,
        { space: "&nbsp", newLine: "<br>"}
    )
    res.send(`<html><body>${wave}</body></html>`)
})



app.listen(PORT, () => {
    console.log("server is running on port --", PORT)
})
