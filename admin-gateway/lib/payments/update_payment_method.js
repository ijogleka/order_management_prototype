const {stripeClient} = require('../api_calls');

async function updatePaymentMethod(ctx) {
  const body = ctx.request.body;

  const response = await stripeClient().paymentMethods.update(ctx.params.id, {
    type: 'card',
    card: {
      exp_month: body.card.exp_month,
      exp_year: body.card.exp_year,
      number: body.card.number,
      cvc: body.card.cvc,
    },
    billing_details: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: {
        city: body.address.city,
        country: body.address.country,
        line1: body.address.line1,
        line2: body.address.line2,
        postal_code: body.address.postal_code,
        state: body.address.state,
      }
    },
  });

  console.info("Response:", response);
  ctx.body = response;
}

module.exports = {updatePaymentMethod};
