import express from "express"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import transactionRoutes from "./routes/transactionRoutes.js"

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api', transactionRoutes)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))