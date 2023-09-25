import {expect, it, describe } from '@jest/globals';

import { Currency, USDollar } from "../server/layers/business/Currency";
import { Money, IncorrectCurrencyError } from "../server/layers/business/Money";

describe("Money class test suite", () => {
    const amount = 30
    const currency = new USDollar()
    const money = new Money(amount, currency)
    // a helper class to test the arithmetic methods
    const argentinianPeso = class implements Currency {
        private name: string;
        private short: string;
    
        constructor() {
            this.name = "Peso argentino";
            this.short = "ARG"
        }
    
        getName(): string {
            return this.name
        }
    
        getShort(): string {
            return this.short;
        }
    }

    describe("The getAmount method", () => {

        it("should return its amount when is called", () => {
            expect(money.getAmount()).toStrictEqual(amount)
        });
    })

    describe("The getCurrency method", () => {
        it("should return its currency object when it is called", () => {    
            expect(money.getCurrency()).toStrictEqual(currency)
        })
    })

    describe("The add method", () => {

        it("should return a Money object when it is called", () => {
            const total = money.add(money)

            expect(total instanceof Money).toStrictEqual(true)
        })

        it("should return a Money object with an amount equal to the total of the added Money objects", () => {
            const total = money.add(money)
            const totalAmount = money.getAmount() + money.getAmount()

            expect(total.getAmount()).toStrictEqual(totalAmount)
        })

        it("should throw an error of type IncorrectCurrencyError if the method receives as parameter some money of different currency", () => {
            const anotherMoney = new Money(amount, new argentinianPeso())
            
            expect(() => money.add(anotherMoney)).toThrowError(IncorrectCurrencyError)
        })

        it("should throw an error showing there are mismatched currencies if the method received as parameter some money with a different currency", () => {
            const anotherMoney = new Money(amount, new argentinianPeso())

            let expected = "";

            try {
                money.add(anotherMoney)
            } catch (error: unknown) {
                expected = error instanceof IncorrectCurrencyError 
                ? error.message 
                : ""
            }
            
            expect(() => money.add(anotherMoney)).toThrow(expected)
        })
    })

    describe("The substract method", () => {

        it("should return a Money object when it is called", () => {
            const total = money.substract(money)
            
            expect(total instanceof Money).toStrictEqual(true)
        })

        it("should return a Money object with an amount equal to the total of the substracted Money objects", () => {
            const total = money.substract(money)
            const totalAmount = money.getAmount() - money.getAmount()

            expect(total.getAmount()).toStrictEqual(totalAmount)
        })

        it("should throw an error of type IncorrectCurrencyError if the method receives as parameter some money of different currency", () => {
            const anotherMoney = new Money(amount, new argentinianPeso())
            
            expect(() => money.substract(anotherMoney)).toThrowError(IncorrectCurrencyError)
        })

        it("should throw an error showing there are mismatched currencies if the method received as parameter some money with a different currency", () => {
            const anotherMoney = new Money(amount, new argentinianPeso())

            let expected = "";

            try {
                money.add(anotherMoney)
            } catch (error: unknown) {
                expected = error instanceof IncorrectCurrencyError 
                ? error.message 
                : ""
            }
            
            expect(() => money.add(anotherMoney)).toThrow(expected)
        })
    })

    describe("The multiply method", () => {

        it("should return a Money object when it is called", () => {
            const total = money.multiply(money)
            
            expect(total instanceof Money).toStrictEqual(true)
        })

        it("should return a Money object with an amount equal to the total of the multiplied Money objects", () => {
            const total = money.multiply(money)
            const totalAmount = money.getAmount() * money.getAmount()

            expect(total.getAmount()).toStrictEqual(totalAmount)
        })

        it("should throw an error of type IncorrectCurrencyError if the method receives as parameter some money of different currency", () => {
            const anotherMoney = new Money(amount, new argentinianPeso())
            
            expect(() => money.multiply(anotherMoney)).toThrowError(IncorrectCurrencyError)
        })

        it("should throw an error showing there are mismatched currencies if the method received as parameter some money with a different currency", () => {
            const anotherMoney = new Money(amount, new argentinianPeso())

            let expected = "";

            try {
                money.add(anotherMoney)
            } catch (error: unknown) {
                expected = error instanceof IncorrectCurrencyError 
                ? error.message 
                : ""
            }
            
            expect(() => money.add(anotherMoney)).toThrow(expected)
        })
    })

    describe("The divide method", () => {

        it("should return a Money object when it is called", () => {
            const total = money.divide(money)

            expect(total instanceof Money).toStrictEqual(true)
        })

        it("should return a Money object with an amount equal to the total of the divided Money objects", () => {
            const total = money.divide(money)
            const totalAmount = money.getAmount() / money.getAmount()

            expect(total.getAmount()).toStrictEqual(totalAmount)
        })

        it("should throw an error of type IncorrectCurrencyError if the method receives as parameter some money of different currency", () => {
            const anotherMoney = new Money(amount, new argentinianPeso())
            
            expect(() => money.divide(anotherMoney)).toThrowError(IncorrectCurrencyError)
        })

        it("should throw an error showing there are mismatched currencies if the method received as parameter some money with a different currency", () => {
            const anotherMoney = new Money(amount, new argentinianPeso())

            let expected = "";

            try {
                money.add(anotherMoney)
            } catch (error: unknown) {
                expected = error instanceof IncorrectCurrencyError 
                ? error.message 
                : ""
            }
            
            expect(() => money.add(anotherMoney)).toThrow(expected)
        })
    })

})