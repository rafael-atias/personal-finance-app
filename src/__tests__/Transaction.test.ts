import { describe, it, expect } from "@jest/globals"
import { Money } from "../server/layers/business/Money"
import { USDollar } from "../server/layers/business/Currency"
import { Transaction } from "../server/layers/business/Transaction"

describe("class Transaction test suite", () => {
    const transactionType = "Deposit"
    const transactionNotes = "Hello world"
    const transactionDate = new Date(2023, 9, 20)
    const money = new Money(30, new USDollar())
    const transaction = new Transaction(money, transactionType, transactionNotes, transactionDate)

    describe("The getMoney method", () => {
        it("should return the same Money object the transaction was instanced with", () => {
            const moneyFromTransaction = transaction.getMoney()

            expect(moneyFromTransaction instanceof Money).toBe(true)
            expect(moneyFromTransaction).toStrictEqual(money)
        })
    })

    describe("The getType method", () => {
        it("should return the same type the transaction was instanced with", () => {
            const type = transaction.getType()

            expect(type).toStrictEqual(transactionType)
        })
    })

    describe("The getNotes method", () => {
        it("should return the same notes the transaction was instanced with", () => {
            const notes = transaction.getNotes()

            expect(notes).toStrictEqual(transactionNotes)
        })
    })

    describe("The getDate method", () => {
        it("should return the Date object the transaction was instanced with", () => {
            const date = transaction.getDate()

            expect(date).toStrictEqual(transactionDate)
        })
    })

    describe("Rhe getDataString method", () => {
        it("should return the DateString representing the Date the transaction was instanced with", () => {
            const dateString = transactionDate.toDateString()

            expect(dateString).toStrictEqual(transaction.getDateString())
        })
    })
})