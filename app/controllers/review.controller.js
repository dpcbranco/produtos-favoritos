const mongoose = require('mongoose');
const reviewSchema = require('../models/Review');
const Review = mongoose.model('Review', reviewSchema);

const _getProductReviews = async (req, res) => {
   const reviews = await Review.find({product: req.params.productId})
                              .limit(req.query.perPage)
                              .skip(req.query.perPage * req.query.page);

   if (!reviews){
      return res.status(404).send({message: "Reviews not found for given product"});
   }

   return res.status(200).send(reviews);

};

const _postReview = async (req, res) => {
   const review = new Review(req.body);

   review.product = req.params.productId;

   review.save((err, reviewDB) => {
      if (err){
         return res.status(500).send({error: err.message, message: "Error posting review"});
      }

      return res.status(200).send({message: "Review posted successfully"});
   });
}

module.exports = {
   getProductReviews: _getProductReviews,
   postReview: _postReview
}
