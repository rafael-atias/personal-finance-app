export interface Currency {
    getName(): string;
    getShort(): string;
}

class AbbreviationCurrency {
    private text!: string;

    constructor(text: string) {
        this.setText(text)
    }

    private setText(text: string): void {
        if(text.length !== 3) {
            throw new Error("The short name of the currency should be 3 characters long");
        }

        this.text = text.toLocaleUpperCase().trim();
    }

    public getText() {
        return this.text;
    }
}

/**
 * 
 */
export class USDollar implements Currency {

    name: string;
    short: AbbreviationCurrency;

    constructor() {
        this.name = "US Dollar";
        this.short = new AbbreviationCurrency("USD");
    }

    getName() {
        return this.name;
    }
    getShort() {
        return this.short.getText();
    }

    toString() {
        return this.short.getText()
    }
}