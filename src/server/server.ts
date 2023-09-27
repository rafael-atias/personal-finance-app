import express, { Express, Request, Response } from "express"
import { Transaction } from "./layers/business/Transaction";
import { Money } from "./layers/business/Money";
import { USDollar } from "./layers/business/Currency";
import dotenv from "dotenv"

// reads the .env file
dotenv.config();

const app:Express = express()

const test = () => {
    const t: Transaction = new Transaction(new Money(100, new USDollar()), "Point of sale", "Compra en el supermercado", new Date(2023, 9, 22));

    return t;

}

// routes
app.get("/", (_: Request, response: Response) => response.send("Greetings, earthlings<br>" + test()));


// start server
app.listen(process.env.PORT, () => console.log(`Server is listening from port ${process.env.PORT}`))