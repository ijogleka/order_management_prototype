const {addOrder} = require('./add_order');
const {markOrderAsPaid} = require('./mark_order_as_paid');
const {closeOrder} = require('./close_order');

module.exports = {addOrder, markOrderAsPaid, closeOrder};
