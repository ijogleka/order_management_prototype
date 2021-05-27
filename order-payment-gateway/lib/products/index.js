const {addProduct} = require('./add');
const {updateProduct} = require('./update');
const {deleteProduct} = require('./delete');
const {getProduct} = require('./get');
const {searchProducts} = require('./search');

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  searchProducts
};
