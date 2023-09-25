import { Currency } from "./Currency";

export class IncorrectCurrencyError implements Error {
    name: string = "IncorrectCurrencyError";
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}

export class Money {
    private amount: number;
    private currency: Currency;
    
    constructor(amount: number, currency: Currency) {
        this.amount = amount;
        this.currency = currency;
    }

    getAmount():number {
        return this.amount
    }

    getCurrency(): Currency {
        return this.currency
    }

    add(aMoney: Money): Money {
        this.checkSameCurrencyAs(aMoney);

        return new Money(aMoney.amount + this.amount, this.currency);
    }

    substract(aMoney: Money): Money {
        this.checkSameCurrencyAs(aMoney);

        return new Money(aMoney.amount - this.amount, this.currency);
    }

    multiply(aMoney: Money): Money {
        this.checkSameCurrencyAs(aMoney);

        return new Money(aMoney.amount * this.amount, this.currency);
    }

    divide(aMoney: Money): Money {
        this.checkSameCurrencyAs(aMoney);

        return new Money(aMoney.amount / this.amount, this.currency);
    }

    private checkSameCurrencyAs(aMoney: Money) {
        if(aMoney.currency !== this.currency) {
            throw new IncorrectCurrencyError(`There is a mismatch of currencies. Got a ${this.currency.getName()} but received a ${aMoney.getCurrency().getName()}` );   
        }
    }

    toString() {
        return `${this.currency} ${this.amount}`
    }
}