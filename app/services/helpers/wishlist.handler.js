const mongoose = require('mongoose');
const wishlistSchema = require('../../models/Wishlist');
const Wishlist = mongoose.model("WishList", wishlistSchema);

const _newWishlist = (customer, callback) => {

   const wishlist = new Wishlist({customer: customer});

   wishlist.save((err, wishlistDB) => callback(err, wishlistDB));
};

const _deleteWishlist = (customerId, callback) => {
   Wishlist.findOneAndRemove({customer: customerId}, (err, wishlistDB) => callback(err, wishlistDB));
};

const _validateWishListAddition = async (req, res, next) => { 
   const ObjectId = mongoose.Types.ObjectId;
   const wishlist = await Wishlist.findOne({customer: new ObjectId(req.params.customerId)});
   

   if (!wishlist){
      return res.status(404).send({message: "Wishlist not found"});
   }

   if (wishlist.products.includes(req.params.productId)){
      return res.status(409).send({message: "Product already added to wishlist"});
   }

   res.locals.wishlist = wishlist;

   next();
}

module.exports = {
   newWishlist: _newWishlist,
   deleteWishlist: _deleteWishlist,
   validateWishListAddition: _validateWishListAddition
}