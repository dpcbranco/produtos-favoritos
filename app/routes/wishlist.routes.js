const router = require('express').Router();
const wishlistController = require('../controllers/wishlist.controller');
const wishlistValidator = require('../services/helpers/wishlistvalidator.handler');

router.post('/wishlist/products/add/:productId/customer/:customerId', wishlistValidator.validateProduct, wishlistController.addProduct)
      .delete('/wishlist/products/remove/:productId/customer/:customerId', wishlistController.removeProduct);

module.exports = router