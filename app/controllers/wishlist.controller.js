const mongoose = require('mongoose');
const wishlistSchema = require('../models/Wishlist')
const Wishlist = mongoose.model("WishList", wishlistSchema);

const _newWishlist = (customer, callback) => {

   const wishlist = new Wishlist({customer: customer});

   wishlist.save((err, wishlistDB) => callback(err, wishlistDB));
}

const _deleteWishlist = (customerId, callback) => {
   Wishlist.findOneAndRemove({customer: customerId}, (err, wishlistDB) => callback(err, wishlistDB));
}

const _addProduct = async (req, res) => {
   const wishlist = res.locals.wishlist;
   const product = res.locals.product;

   wishlist.products.push(product.id);

   wishlist.save((err, wishlistDB) => {
      if (err){
         return res.status(500).send({error: err.message, message: "Error adding favorite product"});
      }

      return res.status(200).send({message: "Product added successfully"})
   });
};

module.exports = {
   newWishlist: _newWishlist,
   deleteWishlist: _deleteWishlist,
   addProduct: _addProduct
}