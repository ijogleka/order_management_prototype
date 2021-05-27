const {addOrder} = require('./add_order');
const {getOrder} = require('./get_order');
const {updateOrder} = require('./update_order');
const {deleteOrder} = require('./delete_order');
const {markOrderAsPaid} = require('./mark_order_as_paid');
const {closeOrder} = require('./close_order');
const {refundOrder} = require('./refund_order');

module.exports = {
  addOrder, getOrder, updateOrder, deleteOrder,
  markOrderAsPaid, closeOrder, refundOrder
};
