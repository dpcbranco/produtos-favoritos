const mongoose = require('mongoose');
const wishlistSchema = require('../models/Wishlist');
const Wishlist = mongoose.model("WishList", wishlistSchema);
const productRequest = require('../services/connections/products.connector').productRequest;

const _addProduct = async (req, res) => {
   const wishlist = res.locals.wishlist;

   wishlist.products.push(req.params.productId);

   wishlist.save((err, wishlistDB) => {
      if (err){
         return res.status(500).send({error: err.message, message: "Error adding favorite product"});
      }

      return res.status(200).send({message: "Product added successfully"})
   });
};

const _removeProduct = async (req, res) => {
   const wishlist = await Wishlist.findOne({customer: req.params.customerId});

   if (!wishlist.products.includes(req.params.productId)){
      return res.status(404).send({message: "Product not found on wishlist"});
   }

   wishlist.products = wishlist.products.filter(item => {
      item === req.params.productId;
   });

   wishlist.save((err, wishlistDB) => {
      if (err){
         return res.status(500).send({error: err.message, message: "Error removing favorite product"});
      }

      return res.status(200).send({message: "Product removed successfully"})
   });

};

const _getWishlist = async (req, res) => {
   const wishlist = await Wishlist.findOne({customer: req.params.customerId});

   if (!wishlist){
      return res.status(404).send({message: "Wishlist not found"});
   }

   const initialProduct = (req.query.pageNumber - 1) * req.query.perPage;
   const lastProduct = initialProduct + req.query.perPage;
   const products = wishlist.products;

   const wishlistResponse = [];

   // Visto que o preço do produto pode ser alterado, seus dados não são armazenados na wishlist
   // e são obtidos diretamente da API
   for (let i = initialProduct; (i < lastProduct && i < products.length); i++){
      try {
         const product = await productRequest(products[i]);
         if (product){ wishlistResponse.push(product) }
      } catch (err){
         console.error(err);
      }
   }
   
   if (wishlistResponse.length === 0){
      return res.status(404).send({message: "Products not found in this page"});
   }

   return res.status(200).send(wishlistResponse);

};

module.exports = {
   addProduct: _addProduct,
   removeProduct: _removeProduct,
   getWishlist: _getWishlist
}