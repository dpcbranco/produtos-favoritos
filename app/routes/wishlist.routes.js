const router = require('express').Router();
const wishlistController = require('../controllers/wishlist.controller');
const productHandler = require('../services/helpers/product.handler');
const wishlistHandler = require('../services/helpers/wishlist.handler');

router.post('/wishlist/products/add/:productId/customer/:customerId', productHandler.validateProduct, wishlistHandler.validateWishListAddition, wishlistController.addProduct)
      .delete('/wishlist/products/remove/:productId/customer/:customerId', wishlistController.removeProduct)
      .get('/wishlist/customer/:customerId', wishlistController.getWishlist);

module.exports = router