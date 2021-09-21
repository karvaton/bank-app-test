import $ from 'jquery';

const url = `http://localhost:5000/bank`;

export function createBankNode({ name, interest_rate, max_loan, min_down_payment, loan_term, }) {
    return `<div class="bank">
        <div class="bank-title">
            <h3 class="bank-name">${name}</h3>
            <button class="options">...</button>
            <form class="options options-hidden">
                <input value="Change" type="button">
                <input value="Delete" type="button">
            </form>
        </div>
        <div class="bank-props">
        <p class="prop interest_rate">
            <b>Interest rate: </b><span>${interest_rate}%</span>
        </p>
        <p class="prop max_loan">
            <b>Maximum loan: </b><span>$${max_loan}</span>
        </p>
        <p class="prop min_down_payment">
            <b>Minimum down payment: </b><span>${min_down_payment}%</span>
        </p>
        <p class="prop loan_term">
            <b>Loan term: </b><span>${loan_term} month.</span>
        </p>
        </div>
        <button hidden>Save</button>
    </div>`;
}

export function createBankOption({ id, name, interest_rate, max_loan, min_down_payment, loan_term, }) {
        return `<option 
            value="${id}"
            data-interest_rate="${interest_rate}"
            data-max_loan="${max_loan}"
            data-min_down_payment="${min_down_payment}"
            data-loan_term="${loan_term}"
        >${name}</option>`;
}

export async function getBanks(target, callback) {
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            json.forEach(
                (bank) => {
                    const bankNode = callback(bank);
                    $(target).append(bankNode);
                }
            );
        });
}


export async function addBank(target, bank) {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bank),
    })
    .then(res => res.json())
    .then(() => {
        const bankNode = createBankNode(bank);
        $(target).append(bankNode);
    })
    .catch(err => alert(err));
}
