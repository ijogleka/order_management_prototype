const {adminApiCall} = require('../api_calls');

async function addToCart(ctx) {
  const body = ctx.request.body;

  const q1 = `
    mutation {
      orderEditBegin(id: "gid://shopify/Order/${body.order_id}") {
        calculatedOrder {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const r1 = await adminApiCall(q1);
  console.info("R1:", JSON.parse(JSON.stringify(r1.data.orderEditBegin.calculatedOrder)));

  const query = `
    mutation {
      orderEditAddVariant(
        id: "${r1.data.orderEditBegin.calculatedOrder.id}",
        variantId: "gid://shopify/ProductVariant/${body.variant_id}",
        quantity: ${body.quantity}
      ) {
        calculatedLineItem {
          id
        }
        calculatedOrder {
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
  console.info("Res:", response);

  const q2 = `
    mutation {
      orderEditCommit(id: "${r1.data.orderEditBegin.calculatedOrder.id}") {
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
  console.info("Q2:", q2);
  const r2 = await adminApiCall(q2);

  ctx.body = JSON.parse(JSON.stringify(r2));
}

module.exports = {addToCart};
