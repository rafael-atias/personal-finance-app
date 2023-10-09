import { randomUUID, UUID } from "crypto";
import { z } from "zod";
import { polyfills as toSortedPolyfill } from "../../polyfills";

/**
 * Here we are defining the types and classes that will
 * represent our data. We use zod to create a schema
 * for each piece of data and then we use that schema
 * to create a type.
 *
 * We do it this way because the objects don't have
 * meaningful behavior, with the exception of the
 * Money class (that's why it's a class)
 *
 */

// schemas
// The schemas are Zod objects that will help the
// Typescript types to validate the data
const currencySchema = z
  .object({
    name: z
      .string({
        invalid_type_error: "The name of a currency musts be a text",
        required_error: "You can't create a currency without a name",
      })
      .trim()
      .min(3, {
        message: `The currency name musts have ${3} characters at least`,
      })
      .max(15, {
        message: `The currency name musts have ${15} characters max`,
      }),
    short: z
      .string({
        invalid_type_error: "The shortname of a currency musts be a text",
        required_error: "You can't create a currency without a shortname",
      })
      .trim()
      .length(3, { message: `The currency name musts be ${3} characters long` })
      .toUpperCase(),
  })
  .required();

const transactionTypeSchema = z.union([
  z.literal("Deposit"),
  z.literal("Cash Withdrawal"),
  z.literal("Point of sale"),
  z.literal("Bank transfer"),
  z.literal("Credit card purchase"),
]);

const usDollarSchema = currencySchema.merge(
  z.object({
    name: z.literal("US Dollar"),
    short: z.literal("USD"),
  })
);

const uyuPesoSchema = currencySchema.merge(
  z.object({
    name: z.literal("Uruguayan Peso"),
    short: z.literal("UYU"),
  })
);

const noMoneySchema = currencySchema.merge(
  z.object({
    name: z.literal(""),
    short: z.literal(""),
  })
);

const accountTypeSchema = z.union([
  z.literal("Checking"),
  z.literal("Savings"),
]);

// data types
export type Currency = z.infer<typeof currencySchema>;

type USDollar = z.infer<typeof usDollarSchema>;

type UruguayanPeso = z.infer<typeof uyuPesoSchema>;

type NoMoney = z.infer<typeof noMoneySchema>;

export const USDOLLAR: USDollar = Object.freeze({
  name: "US Dollar",
  short: "USD",
});

export const UYUPESO: UruguayanPeso = Object.freeze({
  name: "Uruguayan Peso",
  short: "UYU",
});

export const NOMONEY: NoMoney = Object.freeze({
  name: "",
  short: "",
});

export type TransactionType = z.infer<typeof transactionTypeSchema>;

export type AccountType = z.infer<typeof accountTypeSchema>;

export type AccountId = UUID;

// classes
// We use these classes here because we believe that
// these data types should have some important behavior
// baked in.
export class IncorrectCurrencyError extends Error {
  override name: string;

  constructor(message: string) {
    super(message);

    this.name = new.target.name;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class DivideByZeroError extends Error {
  override name: string;

  constructor(message: string) {
    super(message);

    this.name = new.target.name;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class Money {
  readonly amount: number;
  readonly currency: Currency;

  constructor(amount: number, currency: Currency) {
    this.amount = amount;
    this.currency = currency;
  }

  add(aMoney: Money): Money {
    this.checkSameCurrencyAs(aMoney);

    return new Money(this.amount + aMoney.amount, this.currency);
  }

  substract(aMoney: Money): Money {
    this.checkSameCurrencyAs(aMoney);

    return new Money(this.amount - aMoney.amount, this.currency);
  }

  multiply(aMoney: Money): Money {
    this.checkSameCurrencyAs(aMoney);

    return new Money(this.amount * aMoney.amount, this.currency);
  }

  divide(aMoney: Money): Money {
    this.checkSameCurrencyAs(aMoney);

    if (aMoney.amount === 0) {
      throw new DivideByZeroError(`You can't divide ${this.amount} by zero!`);
    }

    return new Money(this.amount / aMoney.amount, this.currency);
  }

  private checkSameCurrencyAs(aMoney: Money) {
    if (aMoney.currency !== this.currency) {
      throw new IncorrectCurrencyError(
        `There is a mismatch of currencies. Got a ${this.currency.name} but received a ${aMoney.currency.name}`
      );
    }
  }

  toString() {
    return `${this.currency.short} ${this.amount}`;
  }
}

export class NullMoney extends Money {
  constructor() {
    super(0, NOMONEY);
  }

  override add(aMoney: Money): Money {
    return aMoney;
  }

  override substract(aMoney: Money): Money {
    return aMoney;
  }

  override multiply(aMoney: Money): Money {
    return aMoney;
  }

  override divide(aMoney: Money): Money {
    return aMoney;
  }

  override toString() {
    return `${this.currency.short} ${this.amount}`;
  }
}

export class Transaction {
  readonly id: string;
  type: TransactionType;
  notes: string;
  date: Date;
  money: Money;

  constructor(
    money: Money,
    type: TransactionType,
    notes: string,
    date: Date,
    id?: string
  ) {
    this.id = id == undefined ? randomUUID() : id;
    this.money = money;
    this.type = type;
    this.notes = notes;
    this.date = date;
  }

  getDateString() {
    return this.date.toDateString();
  }

  toString() {
    return `id = ${this.id}; type = ${this.type}; notes = ${
      this.notes
    }; date = ${this.date.toDateString()}; money = ${this.money}`;
  }
}

/**
 * Class that represents a user's account
 */
export class Account {
  readonly id: AccountId;
  name: string;
  type: AccountType;
  initialBalance: Money;
  transactions: Transaction[];

  /**
   * Instances an Account object
   *
   * If given an id parameter, the constructor will keep that parameter
   * (necesary when instancing an existing account)
   *
   * @param {string} name A human friendly name to identify the account
   * @param {AccountType} type The corresponding account type
   * @param {Transaction[]} transactions A list with the transactions performed with the account's money
   * @param {Money} initialBalance The balance when the user registers the account
   * @param {AccountId} id An id to uniquely identify the account
   *
   */
  constructor({
    name,
    type,
    transactions,
    initialBalance,
    id,
  }: {
    name: string;
    type: AccountType;
    transactions?: Transaction[];
    initialBalance?: Money;
    id?: AccountId;
  }) {
    this.id = id == undefined ? randomUUID() : id;
    this.name = name;
    this.type = type;
    this.initialBalance =
      initialBalance == undefined ? new Money(0, USDOLLAR) : initialBalance;
    this.transactions = transactions == undefined ? [] : transactions;
  }

  /**
   * Calculates the actual balance of this account
   *
   * The method calculates the balance taking as a reference the initial
   * balance and the history of transactions
   */
  getActualBalance(): Money {
    // runs the polyfill
    // the imported function will feature test the enviroment
    // to determine if they are necessary
    toSortedPolyfill();

    return (
      this.transactions
        // we call toSorted here to copy the array of transactions
        // and then sort that copy
        // @ts-ignore
        .toSorted((t1, t2) => (t1.date > t2.date ? 1 : -1))
        // if the transaction is not a deposit, then it is
        // a withdrawal or a variation of it (creadit card purchase,
        // cash withdrawal in an ATM...)
        // In that case, we multiply the amount by -1
        .map(({ type, money }) =>
          type === "Deposit"
            ? money
            : money.multiply(new Money(-1, money.currency))
        )
        // finally, we make an algebraic sum
        // to get the actual balance
        .reduce((acc, val) => acc.add(val), this.initialBalance)
    );
  }
}
