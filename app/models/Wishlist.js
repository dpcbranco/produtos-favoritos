const mongoose = require('mongoose');
const Schema = require('mongoose').Schema

const wishlist = {

   customer: {
      type: Schema.ObjectId,
      ref: 'Customer',
      required: true
   },

   products: [{
      type: String
   }]
}

const wishlistSchema = Schema(wishlist);

module.exports = wishlistSchema;