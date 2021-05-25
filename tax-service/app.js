const render = require('./lib/render');
const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');

const Koa = require('koa');
const app = module.exports = new Koa();

app.use(logger());

app.use(render);

app.use(koaBody());

(function () {
  const {calculateTaxes} = require('./lib/index');

  router.post('/taxes/calculate/', calculateTaxes);
})();

app.use(router.routes());

// listen

if (!module.parent) app.listen(3004);
