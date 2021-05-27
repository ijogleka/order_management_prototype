const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usStreet.Lookup;

// for Server-to-server requests, use this code:
let authId = process.env.SMARTYSTREETS_AUTH_ID;
let authToken = process.env.SMARTYSTREETS_AUTH_TOKEN;
const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);

let clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials);
let client = clientBuilder.buildUsStreetApiClient();


async function verifyAddress(ctx) {
  const body = ctx.request.body;
  console.info("---Body:", body);

  let lookup1 = new Lookup();
  lookup1.inputId = "";  // Optional ID from your system
  lookup1.addressee = "";
  lookup1.street = body.line1;
  lookup1.street2 = body.line2;
  lookup1.secondary = "";
  lookup1.urbanization = "";  // Only applies to Puerto Rico addresses
  lookup1.city = body.city;
  lookup1.state = body.state;
  lookup1.zipCode = body.zipCode;
  lookup1.maxCandidates = 3;
  lookup1.lastLine = "";
  lookup1.match = "invalid";
  console.info("Lookup:", lookup1);

  let batch = new SmartyStreetsCore.Batch();
  batch.add(lookup1);
  console.info("Batch:", batch);

  try {
    const response = await client.send(batch);
    console.info("Response:", response);

    ctx.body = JSON.parse(JSON.stringify(response));
  } catch(e) {
    console.info("Error:", e);
  }

}

module.exports = {verifyAddress};
