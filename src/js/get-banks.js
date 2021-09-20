import $ from 'jquery';

const url = `http://localhost:5000/bank`;

function createBankNode({name, interest_rate, max_loan, min_down_payment, loan_term, }) {
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

export async function getBanks(target) {
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            json.forEach(
                (bank) => {
                    const bankNode = createBankNode(bank);
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
