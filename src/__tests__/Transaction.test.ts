import { randomUUID } from "crypto";
import { describe, it, expect } from "@jest/globals";
import { Money, USDOLLAR, Transaction } from "../server/layers/business/types";

describe("class Transaction test suite", () => {
  const id = randomUUID();
  const transactionType = "Deposit";
  const transactionNotes = "Hello world";
  const transactionDate = new Date(2023, 9, 20);
  const money = new Money(30, USDOLLAR);
  const transaction = new Transaction(
    money,
    transactionType,
    transactionNotes,
    transactionDate
  );

  describe("The id property", () => {
    it("should produce a random value if no id is passed in to the constructor", () => {
      const transaction2 = new Transaction(
        money,
        transactionType,
        transactionNotes,
        transactionDate
      );

      expect(transaction.id).not.toStrictEqual(transaction2.id);
    });

    it("should keep the passed in id value to the constructor", () => {
      const transaction2 = new Transaction(
        money,
        transactionType,
        transactionNotes,
        transactionDate,
        id
      );

      expect(transaction2.id).toStrictEqual(id);
    });
  });

  describe("The money property", () => {
    it("should contain the same Money object the transaction was instanced with", () => {
      const moneyFromTransaction = transaction.money;

      expect(moneyFromTransaction instanceof Money).toBe(true);
      expect(moneyFromTransaction).toStrictEqual(money);
    });
  });

  describe("The type property", () => {
    it("should contain the same type the transaction was instanced with", () => {
      const type = transaction.type;

      expect(type).toStrictEqual(transactionType);
    });
  });

  describe("The notes property", () => {
    it("should contain the same notes the transaction was instanced with", () => {
      const notes = transaction.notes;

      expect(notes).toStrictEqual(transactionNotes);
    });
  });

  describe("The date property", () => {
    it("should contain the Date object the transaction was instanced with", () => {
      const date = transaction.date;

      expect(date).toStrictEqual(transactionDate);
    });
  });

  describe("The getDataString method", () => {
    it("should return the DateString representing the Date the transaction was instanced with", () => {
      const dateString = transactionDate.toDateString();

      expect(dateString).toStrictEqual(transaction.getDateString());
    });
  });
});
