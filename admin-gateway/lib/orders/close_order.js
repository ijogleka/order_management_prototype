const {adminApiCall} = require('../api_calls');

async function closeOrder(ctx) {
  const query = `
    mutation {
      orderClose(input: {
        id: "gid://shopify/Order/${ctx.params.id}"
      }) {
        order {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  console.info("Query:", query);
  const response = await adminApiCall(query);

  ctx.body = JSON.parse(JSON.stringify(response));
}

module.exports = {closeOrder};
