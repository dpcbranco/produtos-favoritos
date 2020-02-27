const router = require('express').Router();
const reviewController = require('../controllers/review.controller');
const productHandler = require('../services/helpers/product.handler');

router.get('/product/reviews/:productId', reviewController.getProductReviews)
      .post('/product/reviews/new/:productId', productHandler.validateProduct, reviewController.postReview);

module.exports = router;