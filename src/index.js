import './style/style.sass';
import $ from "jquery";
import * as Bank from './js/bank-management.js';
import calculate from "./js/mortgage-calculator.js";


$('nav > li').on('click', function (e) {
    $('body > section').hide();
    const section = $(this).attr('class');
    $('body > #' + section).show();
});

const banks = document.getElementById('banks');
const bankList = document.getElementById('bank-list');
Bank.getBanks(banks, Bank.createBankNode);
Bank.getBanks(bankList, Bank.createBankOption);


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
    $(this).prev().trigger('click');
    Bank.addBank(banks, bank);
});

$("#mortgage-calculator button").on("click", function (e) {
    e.preventDefault();
    const form = $("#mortgage-calculator").find("form");
    const initialLoan = parseFloat(form.find("input[name=initial-loan]").val()) || 0;
    const downPayment = parseFloat(form.find("input[name=down-payment]").val()) || 0;
    const bankId = form.find('select').val();
    const bank = form.find(`option[value=${bankId}]`).get()[0].dataset;
    const min = initialLoan * parseFloat(bank.min_down_payment) / 100;

    if (downPayment < min) {
        alert("Down payment can not be less than $" + min);
    } else if (initialLoan > parseFloat(bank.max_loan)) {
        alert("Initial loan must be less than $" + bank.max_loan);
    } else {
        const result = calculate(
            initialLoan,
            parseFloat(bank.interest_rate),
            parseInt(bank.loan_term)
        );
        $('#result').text('$' + Math.ceil(result));
    }
});

$("body").on("mousedown", ".bank button.options", function (e) {
    e.preventDefault();
    $(this).next("form").removeClass("options-hidden");
    $(this).next("form").children('input').first().trigger('focus');
});

$("body").on("focusout", ".bank form.options input", function (e) {
    $(this).parent().
    $(this).addClass("options-hidden");
});

$("body").on("click", ".bank form.options input[value=Change]", function (e) {
    e.preventDefault();
    const isRemove = confirm("Are you sure you want to delete this bank?");
    
    if (isRemove) {
        $(this).parents('.bank').remove();
    }
});