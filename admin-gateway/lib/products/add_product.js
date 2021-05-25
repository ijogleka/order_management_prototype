const {adminApiCall} = require('../api_calls');

function getQuery(ctx) {
  const product = ctx.request.body;
  const productVariants = product.variants.map(x =>
    `{
      sku: "${x.sku}",
      title: "${x.title}",
      inventoryItem: {
        cost: "${x.price}",
        tracked: false
      },
      price: "${x.price}",
      requiresShipping: ${x.requiresShipping},
      taxable: ${x.taxable}
    }`
  );
  const metafields = product.metafields.map(x =>
    `{
      description: "${x.description}",
      key: "${x.key}",
      value: "${x.value}",
      namespace: "${x.namespace}",
      valueType: STRING
    }`
  );
  const query = `
    mutation {
      productCreate(input: {
        handle: "${product.handle}",
        productType: "${product.productType}",
        published: ${product.published},
        title: "${product.title}",
        variants: ${productVariants},
        metafields: ${metafields}
      }) {
        product {
          id
        }
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

async function addProduct(ctx) {
  const query = getQuery(ctx);

  const response = await adminApiCall(query);

  ctx.body = JSON.parse(JSON.stringify(response));
}

module.exports = {addProduct};
