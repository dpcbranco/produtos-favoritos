const mongoose = require('mongoose');
const reviewSchema = require('../../models/Review');
const Review = mongoose.model('Review', reviewSchema);
const productRequest = require('../connections/products.connector').productRequest;


const _validateProduct = async (req, res, next) => {

   try{
      const product = await productRequest(req.params.productId);   
   } catch (err) {
      return res.status(err.status).send(err);
   }

   next();
};

const _productAvgRating = async (productId) => {
   const reviews = await Review.find({product: productId});
   let sumRating = 0;

   for(let review of reviews){
      sumRating += review.rating;
   }

   return reviews.length ? (sumRating / reviews.length) : 0;
}


module.exports = {
   validateProduct: _validateProduct,
   productAvgRating: _productAvgRating
}