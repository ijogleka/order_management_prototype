const {stripeClient} = require('../api_calls');

async function addCustomer(ctx) {
  const body = ctx.request.body;

  const response = await stripeClient().customers.create({
    email: body.email,
    payment_method: body.payment_method,
    address: body.address
  });

  console.info("Response:", response);
}

module.exports = {addCustomer};
