import { randomUUID } from "crypto";
import { Money } from "./Money";

export type TransactionType = "Deposit" | "Cash Withdrawal" | "Point of sale" | "Bank transfer" | "Credit card purchase"

export class Transaction {
    private readonly id: string;
    private type: TransactionType;
    private notes: string;
    private date: Date;
    private money: Money;

    constructor(money: Money, type: TransactionType, notes: string, date: Date) {
        this.id = randomUUID();
        this.money = money;
        this.type = type;
        this.notes = notes;
        this.date = date;
    }

    getId() {
        return this.id
    }

    getMoney() {
        return this.money
    }

    getType() {
        return this.type
    }

    getNotes() {
        return this.notes
    }

    getDate() {
        return this.date
    }

    getDateString() {
        return this.date.toDateString()
    }

    toString() {
        return `id = ${this.id}; type = ${this.type}; notes = ${this.notes}; date = ${this.date.toDateString()}; money = ${this.money}`
    }
}