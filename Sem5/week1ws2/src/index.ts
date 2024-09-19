import express, { Application, Request, Response } from "express"
import morgan from "morgan"
import userRouter from "./routes/users"

const PORT = process.env.PORT || 3000
const app: Application = express()

app.use(morgan("tiny"))
app.use(express.json())
app.use('/api/v1/users', userRouter)

app.get("/ping", async (_req: Request, res: Response) => {
    res.send({
        message: "pong"
    })
})


app.listen(PORT, () => {
    console.log("server is running on port --", PORT)
})
