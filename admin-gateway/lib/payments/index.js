const {addPaymentMethod} = require('./add_payment_method');
const {updatePaymentMethod} = require('./update_payment_method');
const {deletePaymentMethod} = require('./delete_payment_method');
const {getPaymentMethod} = require('./get_payment_method');
const {getPaymentMethods} = require('./get_payment_methods');

const {addCustomer} = require('./add_customer');

const {pay} = require('./pay');

module.exports = {
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getPaymentMethod,
  getPaymentMethods,

  addCustomer,
  pay
};
