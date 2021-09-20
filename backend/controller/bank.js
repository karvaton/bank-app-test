import db from "../db.js";

export async function getAll(req, res) {
    try {
        const banks = (await db.query(`SELECT * FROM banks`)).rows;
        res.status(200).send(banks);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getBank(req, res) {
    try {
        const { bank } = req.params;
        const banks = (await db.query(`SELECT * FROM banks WHERE name = '${bank}'`)).rows[0];
        res.status(200).send(banks);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function create(req, res) {
    try {
        const { name, interest_rate, max_loan, min_down_payment, loan_term } = req.body;
        console.log(req.body);
        console.log(`INSERT INTO banks
                (name, interest_rate, max_loan, min_down_payment, loan_term)
                VALUES ('${name}', '${interest_rate}', '${max_loan}', '${min_down_payment}', '${loan_term}')`);
        const banks = (
            await db.query(`INSERT INTO banks
                (name, interest_rate, max_loan, min_down_payment, loan_term)
                VALUES ('${name}', '${interest_rate}', '${max_loan}', '${min_down_payment}', '${loan_term}')`)
        );
        res.status(200).send(banks);
    } catch (err) {
        res.status(500)
        console.log(err);
    }
}

export async function remove(req, res) {
    try {
        const { bank } = req.params;
        const banks = (
            await db.query(`DELETE FROM banks WHERE name = '${bank}'`)
        ).rows[0];
        res.status(200).send(banks);
    } catch (err) {
        res.status(500).send(err);
    }
}