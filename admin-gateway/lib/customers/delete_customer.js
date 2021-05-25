const {adminApiCall} = require('../api_calls');

function getQuery(ctx) {
  const query = `
    mutation {
      customerDelete(input: {
        id: "gid://shopify/Customer/${ctx.params.id}"
      }) {
        deletedCustomerId
        shop {
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

async function deleteCustomer(ctx) {
  const query = getQuery(ctx);

  const response = await adminApiCall(query);

  ctx.body = JSON.parse(JSON.stringify(response));
}

module.exports = {deleteCustomer};
