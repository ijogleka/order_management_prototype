const {stripeClient} = require('../api_calls');

async function searchPaymentMethods(ctx) {
  const response = await stripeClient().paymentMethods.list({
    customer: ctx.request.query['customer_id'],
    type: ctx.request.query['type'],
  });

  console.info("Response:", response);
  ctx.body = response;
}

module.exports = {searchPaymentMethods};
