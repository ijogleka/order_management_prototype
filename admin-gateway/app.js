const render = require('./lib/render');
const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');

const Koa = require('koa');
const app = module.exports = new Koa();

app.use(logger());

app.use(render);

app.use(koaBody());

(function () {
  const {
    addProduct, deleteProduct, getProduct, getProducts
  } = require('./lib/products/index');

  router.post('/products/', addProduct);
  router.delete('/products/:id/', deleteProduct);
  // router.put('/products/:id/', updateProduct);
  router.get('/products/', getProducts);
  router.get('/products/:id/', getProduct);
})();

(function () {
  const { addCustomer, deleteCustomer } = require('./lib/customers/index');

  router.post('/customers/', addCustomer);
  router.delete('/customers/:id/', deleteCustomer);
})();

(function () {
  const { addPaymentMethod, updatePaymentMethod, deletePaymentMethod,
    getPaymentMethod, getPaymentMethods, addCustomer,
    pay } = require('./lib/payments/index');

  router.get('/payment_methods/:id/', getPaymentMethod);
  router.get('/payment_methods/', getPaymentMethods);
  router.post('/payment_methods/', addPaymentMethod);
  router.put('/payment_methods/:id/', updatePaymentMethod);
  router.delete('/payment_methods/:id/', deletePaymentMethod);

  router.post('/payment_methods/customers/', addCustomer);
  router.post('/payment_methods/pay/', pay);
})();

(function () {
  const { addOrder, markOrderAsPaid, closeOrder } = require('./lib/orders/index');

  router.post('/orders/', addOrder);
  router.post('/orders/:id/mark_as_paid/', markOrderAsPaid);
  router.post('/orders/:id/close/', closeOrder);
})();

app.use(router.routes());

// listen

if (!module.parent) app.listen(3002);
