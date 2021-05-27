const render = require('./lib/render');
const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');

const Koa = require('koa');
const app = module.exports = new Koa();

app.use(logger());

app.use(render);

app.use(koaBody());

// Products API
(function () {
  const {
    addProduct, deleteProduct, updateProduct, getProduct, searchProducts
  } = require('./lib/products/index');

  router.get('/opg/v1/products/:id/', getProduct);
  router.post('/opg/v1/products/', addProduct);
  router.put('/opg/v1/products/:id/', updateProduct);
  router.delete('/opg/v1/products/:id/', deleteProduct);
  router.get('/opg/v1/products/', searchProducts);
})();

// Customers API
(function () {
  const { addCustomer, deleteCustomer, getCustomerOrders } = require('./lib/customers/index');

  router.post('/opg/v1/customers/', addCustomer);
  router.delete('/opg/v1/customers/:id/', deleteCustomer);
  router.get('/opg/v1/customers/orders/', getCustomerOrders);
})();

// Payments API (Payment Methods)
(function () {
  const { addPaymentMethod, updatePaymentMethod, deletePaymentMethod,
    getPaymentMethod, searchPaymentMethods, addCustomer,
    pay } = require('./lib/payment_methods/index');

  router.get('/opg/v1/payment_methods/:id/', getPaymentMethod);
  router.post('/opg/v1/payment_methods/', addPaymentMethod);
  router.put('/opg/v1/payment_methods/:id/', updatePaymentMethod);
  router.delete('/opg/v1/payment_methods/:id/', deletePaymentMethod);
  router.get('/opg/v1/payment_methods/', searchPaymentMethods);
})();

// Payments API (Promotion Codes)
(function () {
  const { addPromoCode, updatePromoCode, deletePromoCode, getPromoCode} = require('./lib/promotions/index');

  router.get('/opg/v1/promotions/:code/', getPromoCode);
  router.post('/opg/v1/promotions/', addPromoCode);
  router.put('/opg/v1/promotions/:code/', updatePromoCode);
  router.delete('/opg/v1/promotions/:code/', deletePromoCode);
})();

// Payments API (Pay)
(function () {
  const { payNow, payLater, getTransaction, getBalance } = require('./lib/payments/index');

  router.get('/opg/v1/pay/:id/', getTransaction);
  router.get('/opg/v1/pay/:user_id/balance', getBalance);
  router.post('/opg/v1/pay/now/', payNow);
  router.post('/opg/v1/pay/later/', payLater);
})();

// Shipping/Taxes/Miscellaneous APIs
(function() {
  const {verifyAddress} = require('./lib/address_verification/index');
  const {calculateTaxes} = require('./lib/taxes/index');

  router.post('/opg/v1/address/verify/', verifyAddress);
  router.post('/opg/v1/taxes/calculate/', calculateTaxes);
})();


// Orders API
(function () {
  const { addOrder, getOrder, updateOrder, deleteOrder,
    markOrderAsPaid, closeOrder, refundOrder } = require('./lib/checkout/index');

  router.post('/opg/v1/orders/', addOrder);
  router.get('/opg/v1/orders/:id/', getOrder);
  router.put('/opg/v1/orders/:id/', updateOrder);
  router.delete('/opg/v1/orders/:id/', deleteOrder);
  router.post('/opg/v1/orders/mark-as-paid/:id/', markOrderAsPaid);
  router.post('/opg/v1/orders/close/:id/', closeOrder);
  router.post('/opg/v1/orders/refund/:id/', refundOrder);
})();

// // Draft Order (a.k.a. Cart APIs)
// (function() { // To Add
//
//   router.post('/opg/add-to-cart/', addToCart);
//   router.post('/opg/remove-from-cart/', removeFromCart);
// })();



app.use(router.routes());

// listen

if (!module.parent) app.listen(3002);
