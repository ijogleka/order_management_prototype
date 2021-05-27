const {addPaymentMethod} = require('./add');
const {updatePaymentMethod} = require('./update');
const {deletePaymentMethod} = require('./delete');
const {getPaymentMethod} = require('./get');
const {searchPaymentMethods} = require('./search');

const {addCustomer} = require('./add_customer');

const {pay} = require('./pay');

module.exports = {
  getPaymentMethod,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  searchPaymentMethods,

  addCustomer,
  pay
};
