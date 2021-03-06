const mongoose = require('mongoose');
const customerSchema = require('../models/Customer');
const Customer = mongoose.model("Customer", customerSchema)
const wishlistHandler = require('../services/helpers/wishlist.handler');

const _getCustomer = async (req, res) => {

   const customer = await Customer.findOne({email: req.body.email})

   if (!customer){
      return res.status(404).send({message: "Customer not found!"});
   }

   return res.status(200).send(customer);
};

const _postCustomer = async (req, res) => {

   let customer = await Customer.findOne({email: req.body.email});

   if (customer){
      return res.status(409).send({message: "E-mail address registration already exists"});
   }

   customer = new Customer({name: req.body.name, email: req.body.email});

   customer.save((err, customerDB) => {
      if (err) {
         return res.status(500).send({error: err.message, message: "Error creating new customer"});
      }

      wishlistHandler.newWishlist(customerDB, (errWishlist, wishlistDB) => {
         if (errWishlist){
            customerDB.remove();
            return res.status(500).send({error: errWishlist.message, message: "Error creating customer's wishlist"})
         }
   
         return res.status(201).send({message: "Customer created successfully"});
      });
   })
   
};

const _deleteCustomer = async (req, res) => {
   const customer = await Customer.findOne({email: req.body.email});

   if (!customer){
      return res.status(404).send({message: "Customer not found"});
   }

   wishlistHandler.deleteWishlist(customer._id, (errWishlist, wishlistDB) => {
      if (errWishlist){
         return res.status(500).send({error: errWishlist.message, message: "Error deleting customer wishlist"})
      } 
      customer.remove((err, customerDB) => {
         if (err){
            return res.status(500).send({error: err.message, message: "Error deleting customer"});
         }
   
         return res.status(200).send({message: "Customer successfully deleted"});
      })
   })
};

const _patchCustomer = async (req, res) => {

   if (!req.body.name){
      return res.status(204).send({message: "No changes made"});
   }

   await Customer.findOneAndUpdate({email: req.body.email}, {name: req.body.name}, 
      (err, customerDB) => {
         if (err){
            return res.status(500).send({error: err.message, message: "Error updating customer"});
         }

         if (!customerDB){
            return res.status(404).send({message: "Customer not found"});
         }
         return res.status(200).send({message: "Customer updated"});
      }
   );
      
   

}

module.exports = {
   getCustomer: _getCustomer,
   postCustomer: _postCustomer,
   deleteCustomer: _deleteCustomer,
   patchCustomer: _patchCustomer
}