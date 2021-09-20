import $ from "jquery";
import * as banks from './js/get-banks.js';

const bankList = document.getElementById('banks');
banks.getBanks(bankList);

$('#add-bank button.cancel').on('click', e => {
    e.preventDefault();
    $('#add-bank form input').each((index, input) => $(input).val(''));
});

$('#add-bank button.ok').on('click', e => {
    e.preventDefault();
    const bank = {};
    $("#add-bank form input").each((index, input) => {
        const attr = $(input).attr('name');
        bank[attr] = $(input).val();
    });
    banks.addBank(bankList, bank);
});
