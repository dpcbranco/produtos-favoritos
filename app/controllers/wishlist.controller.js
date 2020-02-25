const mongoose = require('mongoose');
const wishlistSchema = require('../models/Wishlist')
const Wishlist = mongoose.model("WishList", wishlistSchema);

const _newWishlist = (customer, callback) => {

   const wishlist = new Wishlist({customer: customer});

   wishlist.save((err, wishlistDB) => callback(err, wishlistDB));
}


module.exports = {
   newWishlist: _newWishlist,
   deleteWishlist: _deleteWishlist
}