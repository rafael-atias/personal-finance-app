import { Currency } from "./Currency";

export class Money {
    amount: number;
    currency: Currency;
    
    constructor(amount: number, currency: Currency) {
        this.amount = amount;
        this.currency = currency;
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
            throw new Error("These sums don't have the same currency");   
        }
    }

    toString() {
        return `${this.currency} ${this.amount}`
    }
}