import { expect, it, describe } from "@jest/globals";
import {
  Money,
  IncorrectCurrencyError,
  DivideByZeroError,
  USDOLLAR,
} from "../server/layers/business/types";

describe("Money class test suite", () => {
  const amount = 30;
  const argentinianPeso = { name: "Peso argentino", short: "ARG" };

  const money = new Money(amount, USDOLLAR);

  describe("The add method", () => {
    it("should return a Money object when it is called", () => {
      const total = money.add(money);

      expect(total instanceof Money).toStrictEqual(true);
    });

    it("should return a Money object with an amount equal to the total of the added Money objects", () => {
      const total = money.add(money);
      const totalAmount = money.amount + money.amount;

      expect(total.amount).toStrictEqual(totalAmount);
    });

    it("should throw an error showing there are mismatched currencies if the method received as parameter some money with a different currency", () => {
      const anotherMoney = new Money(amount, argentinianPeso);

      let expected = "";

      try {
        money.add(anotherMoney);
      } catch (error: unknown) {
        expected = error instanceof IncorrectCurrencyError ? error.message : "";
      }

      expect(() => money.add(anotherMoney)).toThrow(expected);
    });
  });

  describe("The substract method", () => {
    it("should return a Money object when it is called", () => {
      const total = money.substract(money);

      expect(total instanceof Money).toStrictEqual(true);
    });

    it("should throw an error showing there are mismatched currencies if the method received as parameter some money with a different currency", () => {
      const anotherMoney = new Money(amount, argentinianPeso);

      let expected = "";

      try {
        money.substract(anotherMoney);
      } catch (error: unknown) {
        expected = error instanceof IncorrectCurrencyError ? error.message : "";
      }

      expect(() => money.substract(anotherMoney)).toThrow(expected);
    });

    it("should substract the Money object passed in as paramter to the given Money object", () => {
      const money2 = new Money(amount / 2, USDOLLAR);
      const total = money.substract(money2); // 30 - 15 = 15
      const totalAmount = money.amount - money2.amount;

      expect(total.amount).toStrictEqual(totalAmount);
    });

    it("should return a Money object with a negative amount if the passed in Money object has a greater amount than the given Money object", () => {
      const money2 = new Money(amount * 2, USDOLLAR);
      const total = money.substract(money2);
      const totalAmount = money.amount - money2.amount;

      expect(total.amount).toStrictEqual(totalAmount);
    });
  });

  describe("The multiply method", () => {
    it("should return a Money object when it is called", () => {
      const total = money.multiply(money);

      expect(total instanceof Money).toStrictEqual(true);
    });

    it("should return a Money object with an amount equal to the total of the multiplied Money objects", () => {
      const total = money.multiply(money);
      const totalAmount = money.amount * money.amount;

      expect(total.amount).toStrictEqual(totalAmount);
    });

    it("should throw an error showing there are mismatched currencies if the method received as parameter some money with a different currency", () => {
      const anotherMoney = new Money(amount, argentinianPeso);

      let expected = "";

      try {
        money.multiply(anotherMoney);
      } catch (error: unknown) {
        expected = error instanceof IncorrectCurrencyError ? error.message : "";
      }

      expect(() => money.multiply(anotherMoney)).toThrow(expected);
    });
  });

  describe("The divide method", () => {
    it("should return a Money object when it is called", () => {
      const total = money.divide(money);

      expect(total instanceof Money).toStrictEqual(true);
    });

    it("should divide the given Money object by the Money object passed in as parameter", () => {
      const money2 = new Money(amount / 2, USDOLLAR);
      const total = money.substract(money2);
      const totalAmount = money.amount - money2.amount;

      expect(total.amount).toStrictEqual(totalAmount);
    });

    it("should throw an error showing there are mismatched currencies if the method received as parameter some money with a different currency", () => {
      const anotherMoney = new Money(amount, argentinianPeso);

      let expected = "";

      try {
        money.divide(anotherMoney);
      } catch (error: unknown) {
        expected = error instanceof IncorrectCurrencyError ? error.message : "";
      }

      expect(() => money.divide(anotherMoney)).toThrow(expected);
    });

    it("should throw an error if we try to divide some money by another money object with an amount of zero", () => {
      const anotherMoney = new Money(0, USDOLLAR);

      let expected = "";

      try {
        money.divide(anotherMoney);
      } catch (error: unknown) {
        expected = error instanceof DivideByZeroError ? error.message : "";
      }

      expect(() => money.divide(anotherMoney)).toThrow(expected);
    });
  });
});
