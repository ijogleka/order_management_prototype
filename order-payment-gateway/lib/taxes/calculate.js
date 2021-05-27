const Avatax = require('avatax');

const config = {
  appName: 'admin-gateway',
  appVersion: '1.0',
  environment: 'sandbox',
  machineName: 'your-machine-name'
};

const creds = {
  username: process.env.AVALARA_USERNAME,
  password: process.env.AVALARA_PASSWORD
};

const client = new Avatax(config).withSecurity(creds);

async function calculateTaxes(ctx) {
  const taxDocument = ctx.request.body;

  const response = await client.createTransaction({ model: taxDocument });

  ctx.body = JSON.parse(JSON.stringify(response));
}

module.exports = {calculateTaxes};
