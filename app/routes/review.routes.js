const router = require('express').Router();
const reviewController = require('../controllers/review.controller');
const productValidator = require('../services/helpers/productvalidator.handler');

router.get('/product/reviews/:productId', reviewController.getProductReviews)
      .post('/product/reviews/new/:productId', productValidator.validateProduct, reviewController.postReview);

module.exports = router;