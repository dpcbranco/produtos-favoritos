const mongoose = require('mongoose');
const wishlistSchema = require('../models/Wishlist')
const Wishlist = mongoose.model("WishList", wishlistSchema);

const _newWishlist = (customer, callback) => {

   const wishlist = new Wishlist({customer: customer});

   wishlist.save((err, wishlistDB) => {
      if (err){
         console.log(err)
         callback(err);
      }

      console.log(wishlistDB)
      callback(wishlistDB);
   });
}

module.exports = {
   newWishlist: _newWishlist
}