const fetch = require('node-fetch');
const {Stripe} = require('stripe');

function adminApiCall(query) {
  return fetch('https://<your username>:<your password>@compass-development.myshopify.com/admin/api/2021-04/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
      "Access-Control-Origin": "*"
    },
    "body": query
  }).then(response => response.json());
}

function stripeClient() {
  const stripe = Stripe('<your secret key>');
  return stripe;
}

module.exports = {
  adminApiCall,
  storefrontApiCall,
  stripeClient
};
