const {adminApiCall} = require('../api_calls');

function getQuery(ctx) {
  const query = `
    mutation {
      productDelete(input: {
        id: "gid://shopify/Product/${ctx.params.id}"
      }) {
        deletedProductId
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

async function deleteProduct(ctx) {
  const query = getQuery(ctx);

  const response = await adminApiCall(query);

  ctx.body = JSON.parse(JSON.stringify(response));
}

module.exports = {deleteProduct};
