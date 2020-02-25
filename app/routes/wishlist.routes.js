const router = require('express').Router();
const wishlistController = require('../controllers/wishlist.controller');

router.post('/wishlist/products/add/:customerId', wishlistController.addProduct);

module.exports = router