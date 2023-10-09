import { randomUUID } from "crypto";
import { describe, it, expect } from "@jest/globals";
import {
  Money,
  Transaction,
  USDOLLAR,
  Account,
  AccountId,
  NullMoney,
} from "../server/layers/business/types";
import { polyfills } from "../server/polyfills";

//execute the polyfills required by the Account class
polyfills();

describe("The Account class test suite", () => {
  const id: AccountId = randomUUID();
  const name = "Bank of America";
  const type = "Checking";
  const initialBalance = new Money(100, USDOLLAR);
  const transactions = [
    new Transaction(
      new Money(10, USDOLLAR),
      "Cash Withdrawal",
      "To buy groceries",
      new Date(2023, 4, 10)
    ),
    new Transaction(
      new Money(20, USDOLLAR),
      "Credit card purchase",
      "New pants",
      new Date(2023, 4, 13)
    ),
  ];

  const account = new Account({ name, type, transactions, initialBalance });

  describe("The name property", () => {
    it("should contain the name passed in to the constructor", () => {
      expect(account.name).toStrictEqual(name);
    });
  });

  describe("The type property", () => {
    it("should contain the type passed in to the constructor", () => {
      expect(account.type).toStrictEqual(type);
    });
  });

  describe("The initialBalance property", () => {
    it("should contain the initialBalance passed in to the constructor", () => {
      expect(account.initialBalance).toStrictEqual(initialBalance);
    });
  });

  describe("The transactions property", () => {
    it("should contain the transactions array passed in to the constructor", () => {
      expect(account.transactions).toStrictEqual(transactions);
    });
  });

  describe("The id property", () => {
    it("should produce a random value if no id is passed in to the constructor", () => {
      const account2 = new Account({
        name,
        type,
        transactions,
        initialBalance,
      });

      expect(account.id).not.toStrictEqual(account2.id);
    });

    it("should keep the passed in id value to the constructor", () => {
      const account2 = new Account({
        name,
        type,
        transactions,
        initialBalance,
        id,
      });

      expect(account2.id).toStrictEqual(id);
    });
  });

  describe("The getActualBalance method", () => {
    describe("should return the actual balance of the account", () => {
      // 100 - 10 - 20 = 70
      const expected = initialBalance
        .substract(transactions[0]?.money || new NullMoney())
        .substract(transactions[1]?.money || new NullMoney());

      expect(expected.amount).toStrictEqual(account.getActualBalance().amount);
    });
  });
});
