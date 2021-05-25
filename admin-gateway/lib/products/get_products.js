const {adminApiCall} = require('../api_calls');

function getQuery(ctx) {
  const query = `{
     shop {
       name
       products(first: 10, query: "product_type:'${ctx.request.query['product_type']}'") {
         edges {
           node {
             id
             title
             productType
             description
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

 async function getProducts(ctx) {
   const query = getQuery(ctx);

   const response = await adminApiCall(query);

   ctx.body = JSON.parse(JSON.stringify(response));
 }

 module.exports = {getProducts};
