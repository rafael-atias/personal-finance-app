import { randomUUID } from "crypto";
import { Transaction, Money, AccountType } from "../business/types";

export class Account {
  readonly id: string;
  name: string;
  type: AccountType;
  balance: Money;
  transactions: Transaction[];

  constructor(
    name: string,
    type: AccountType,
    balance: Money,
    transactions: Transaction[],
    id?: string
  ) {
    this.id = id == undefined ? randomUUID() : id;
    this.name = name;
    this.type = type;
    this.balance = balance;
    this.transactions = transactions;
  }
}
