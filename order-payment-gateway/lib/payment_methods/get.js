const {stripeClient} = require('../api_calls');

async function getPaymentMethod(ctx) {
  const response = await stripeClient().paymentMethods.retrieve(ctx.params.id);

  console.info("Response:", response);
  ctx.body = response;
}

module.exports = {getPaymentMethod};
