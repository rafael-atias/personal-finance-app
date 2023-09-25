import {expect, it, describe } from '@jest/globals';
import { USDollar } from "../server/layers/business/Currency"

describe("USDollar class test suite", () => {

    describe("The USDollar.getShort method ", () => {

        it("should return USD as a short name", () => {
            const expected = "USD"
            const dollar = new USDollar()
            
            expect(expected).toEqual(dollar.getShort())
        })
    })

    describe("The USDollar.getName method ", () => {

        it("should return US Dollar as a currency name", () => {
            const expected = "US Dollar"
            const dollar = new USDollar()
            
            expect(expected).toEqual(dollar.getName())
        })
    })
})