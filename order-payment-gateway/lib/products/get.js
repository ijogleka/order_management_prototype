const {adminApiCall} = require('../api_calls');

function getQuery(ctx) {
  const query = `{
     shop {
       name
       products(first: 10, query: "id:'${ctx.params.id}'") {
         edges {
           node {
             id
             title
             productType
             description
             metafields(namespace: "digital-ad", first: 10) {
               edges {
                 node {
                   key
                   value
                   namespace
                   description
                 }
               }
             }
             variants(first: 10) {
               edges {
                 node {
                   id
                   sku
                   title
                 }
               }
             }
           }
         }
       }
     }
   }`;

  return query;
}

async function getProduct(ctx) {
  const query = getQuery(ctx);
  const response = await adminApiCall(query);

  ctx.body = JSON.parse(JSON.stringify(response));
}

module.exports = {getProduct};
