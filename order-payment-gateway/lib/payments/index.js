const {payNow} = require('./pay_now');
const {payLater} = require('./pay_later');
const {getTransaction} = require('./get_transaction');
const {getBalance} = require('./get_balance');

module.exports = {payNow, payLater, getTransaction, getBalance};
