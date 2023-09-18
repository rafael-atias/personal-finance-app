import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"

// reads the .env file
dotenv.config()

const app:Express = express()

// routes
app.get("/", (_: Request, response: Response) => response.send("Greetings, earthlings"));


// start server
app.listen(process.env.PORT, () => console.log(`Server is listening from port ${process.env.PORT}`))