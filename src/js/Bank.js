export default class Bank {
    constructor({
        id,
        name,
        interest_rate,
        max_loan,
        min_down_payment,
        loan_term,
    }) {
        this.id = id;
        this.name = name;
        this.interest_rate = interest_rate;
        this.max_loan = max_loan;
        this.min_down_payment = min_down_payment;
        this.loan_term = loan_term;
    }

    createBankNode() {
        const { name, interest_rate, max_loan, min_down_payment, loan_term, } = this;
        return `<div class="bank">
            <div class="bank-title">
                <h3 class="bank-name">${name}</h3>
                <button class="options">...</button>
            </div>
            <div class="bank-props">
                <p class="prop interest_rate">
                    <b>Interest rate:</b> ${interest_rate}%
                </p>
                <p class="prop max_loan">
                    <b>Maximum loan:</b> $${max_loan}
                </p>
                <p class="prop min_down_payment">
                    <b>Minimum down payment:</b> $${min_down_payment}
                </p>
                <p class="prop loan_term">
                    <b>Loan term: </b>${loan_term} month.
                </p>
            </div>
        </div>`;
    }

    createOption() {
        const { id, name } = this;
        return `<option value="${id}">${name}</option>`;
    }
}