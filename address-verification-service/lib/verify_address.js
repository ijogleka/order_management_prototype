async function verifyAddress(ctx) {
  ctx.body = {
    status: 'verified'
  };
}

module.exports = {verifyAddress};
