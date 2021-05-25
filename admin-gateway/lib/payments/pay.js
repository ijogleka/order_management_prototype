const {stripeClient} = require('../api_calls');

async function pay(ctx) {
  const body = ctx.request.body;

  const response = await stripeClient().paymentIntents.create({
    amount: body.amount,
    currency: body.currency,
    confirm: true,
    payment_method: body.payment_method,
    customer: body.customer
  });

  ctx.body = response;
}

module.exports = {pay};
