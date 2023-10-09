import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { polyfills } from "./polyfills";
import { Transaction, Money, USDOLLAR, UYUPESO } from "./layers/business/types";

// reads the .env file
dotenv.config();

const app: Express = express();

const test = () => {
  const t: Transaction = new Transaction(
    new Money(100, UYUPESO),
    "Point of sale",
    "Compra en el supermercado",
    new Date(2023, 9, 22)
  );

  return t;
};

// routes
app.get("/", (_: Request, response: Response) =>
  response.send("Greetings, earthlings<br>" + test())
);

// start server
app.listen(process.env.PORT, () =>
  console.log(`Server is listening from port ${process.env.PORT}`)
);
