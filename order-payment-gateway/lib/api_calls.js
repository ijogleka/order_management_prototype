const fetch = require('node-fetch');
const {Stripe} = require('stripe');

function adminApiCall(query) {
  return fetch(`${process.env.SHOPIFY_AUTHENTICATED_STORE_URL}/admin/api/2021-04/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
      "Access-Control-Origin": "*"
    },
    "body": query
  }).then(response => response.json());
}

function stripeClient() {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  return stripe;
}

module.exports = {
  adminApiCall,
  stripeClient
};
