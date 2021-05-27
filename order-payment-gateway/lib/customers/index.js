const {addCustomer} = require('./add');
const {deleteCustomer} = require('./delete');
const {getCustomerOrders} = require('./get_customer_orders');

module.exports = {addCustomer, deleteCustomer, getCustomerOrders};
