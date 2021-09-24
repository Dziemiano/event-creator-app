import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import eventRoutes from "./routes/routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(eventRoutes)

const uri: string = `mongodb://localhost:27017/eventsdb`

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    console.log(error)
  })