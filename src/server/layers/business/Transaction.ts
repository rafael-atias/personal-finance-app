import {randomUUID} from "crypto";
import { Money } from "./Money";

export class Transaction {
    id: string;
    type: string;
    notes: string;
    date: Date;
    money: Money;
    
    constructor(money: Money, type: string, notes: string, date: Date) {
        this.id = randomUUID();
        this.money = money;
        this.type = type;
        this.notes = notes;
        this.date = date;
    }

    toString() {
        return `id = ${this.id}; type = ${this.type}; notes = ${this.notes}; date = ${this.date.toDateString()}; money = ${this.money}`
    }
}