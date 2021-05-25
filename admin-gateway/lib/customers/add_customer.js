const {adminApiCall} = require('../api_calls');

function getQuery(ctx) {
  const customer = ctx.request.body;

  const query = `
    mutation {
      customerCreate(input: {
        email: "${customer.email}",
        firstName: "${customer.firstName}",
        lastName: "${customer.lastName}"
      }) {
        customer {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  return query;
}

async function addCustomer(ctx) {
  const query = getQuery(ctx);

  const response = await adminApiCall(query);

  ctx.body = JSON.parse(JSON.stringify(response));
}

module.exports = {addCustomer};
