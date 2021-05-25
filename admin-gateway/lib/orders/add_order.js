const {adminApiCall} = require('../api_calls');

async function addOrder(ctx) {
  const order = ctx.request.body;
  const lineItems = order.lineItems.map((x) => `
    {
      quantity: ${x.quantity},
      variantId: "gid://shopify/ProductVariant/${x.variantId}"
    }
  `);

  const query = `
    mutation {
      draftOrderCreate(input: {
        customerId: "gid://shopify/Customer/${order.customerId}",
        email: "${order.email}",
        lineItems: ${lineItems}
      }) {
        draftOrder {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await adminApiCall(query);

  const draftOrderId = response.data.draftOrderCreate.draftOrder.id;

  const completeDraftQuery = `
    mutation {
      draftOrderComplete(id: "${draftOrderId}", paymentPending: true) {
        draftOrder {
          id
          order {
            id
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const completeResponse = await adminApiCall(completeDraftQuery);

  ctx.body = JSON.parse(JSON.stringify(completeResponse));
}

module.exports = {addOrder};
