const router = require('express').Router();
const wishlistController = require('../controllers/wishlist.controller');
const productValidator = require('../services/helpers/productvalidator.handler');

router.post('/wishlist/products/add/:productId/customer/:customerId', productValidator.validateProduct, productValidator.validateWishListAddition, wishlistController.addProduct)
      .delete('/wishlist/products/remove/:productId/customer/:customerId', wishlistController.removeProduct)
      .get('/wishlist/customer/:customerId', wishlistController.getWishlist);

module.exports = router