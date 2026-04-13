import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/user.js"
import cookieParser from "cookie-parser"
import blogRouter from "./routes/blogs.js"
import { config } from "dotenv"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

config({
    path: './data/config.env'
})

mongoose.connect(process.env.MONGO_URL, {
    dbName: "MERN_2026"
}).then(() => console.log("MongoDB is connected"))

// ***** User router *****
app.use('/api/users', userRouter)

// ******** Blog router ********
app.use('/api/blogs', blogRouter)


app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT: ${process.env.PORT}`)
})