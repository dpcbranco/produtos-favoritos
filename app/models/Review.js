const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const review = {
   product: {
      type: String,
      required: true
   },
   comment: {
      type: String
   },
   rating: {
      type: Number,
      min: 0,
      max: 10,
      required: true
   }
}

const reviewSchema = Schema(review, {versionKey: false});

module.exports = reviewSchema;