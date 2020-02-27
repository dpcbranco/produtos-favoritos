const mongoose = require('mongoose');
const productRequest = require('../connections/products.connector').productRequest;


const _validateProduct = async (req, res, next) => {

   try{
      const product = await productRequest(req.params.productId);   
   } catch (err) {
      return res.status(err.status).send(err);
   }

   next();
};


module.exports = {
   validateProduct: _validateProduct
}