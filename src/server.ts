import express, { json } from "express";
import { connectDatabase } from "./database";
import { moviesRoutes } from "./routes/route";
const app = express()
app.use(express.json())
const port = 3000
app.use("/movies", moviesRoutes)
app.listen(port, async()=>{
  console.log(`server on na porta ${port}`)
  await connectDatabase()
})  