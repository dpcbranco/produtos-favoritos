const requestPromise = require('promise-request-retry');

const _productRequest = async (productId) => {
   const options = {
      url: `${process.env.URL_PRODUCTS}/${productId}`, 
      method: "GET",
      json: true
   };

   return new Promise ((resolve, reject) => {
      requestPromise(options).then(response =>{
         resolve(response);
      }).catch(err => {
         if (err.statusCode === 404){
            reject({message: "Product not found", status: err.statusCode});
         } else {
            reject({message: "Error retrieving product", error: err.error, status: err.statusCode})
         }
      });
   });
}

module.exports = {
   productRequest: _productRequest
}