const {getPromoCode} = require('./get');
const {addPromoCode} = require('./add');
const {updatePromoCode} = require('./update');
const {deletePromoCode} = require('./delete');

module.exports = {
  getPromoCode, addPromoCode, updatePromoCode, deletePromoCode
};
