const router = require('express').Router();
const wishlistController = require('../controllers/wishlist.controller');
const wishlistValidator = require('../services/helpers/wishlistvalidator.handler');

router.post('/wishlist/products/add/:customerId', wishlistValidator.validateProduct, wishlistController.addProduct);

module.exports = router