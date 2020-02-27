const mongoose = require('mongoose');
const wishlistSchema = require('../../models/Wishlist')
const Wishlist = mongoose.model("WishList", wishlistSchema);
const productRequest = require('../connections/products.connector').productRequest;


const _validateProduct = async (req, res, next) => {

   try{
      const product = await productRequest(req.params.productId);   
   } catch (err) {
      return res.status(err.status).send(err);
   }

   next();
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
   validateProduct: _validateProduct,
   validateWishListAddition: _validateWishListAddition
}