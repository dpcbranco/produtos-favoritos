const mongoose = require('mongoose');
const customerSchema = require('../models/Customer');
const Customer = mongoose.model("Customer", customerSchema)
const wishlistController = require('./wishlist.controller')

const _getCustomer = async (req, res) => {

   const customer = await Customer.findOne({email: req.body.email})

   if (!customer){
      return res.status(404).send({message: "Customer not found!"});
   }

   return res.status(200).send({email: customer.email, name: customer.name});
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

      wishlistController.newWishlist(customerDB, (wishlist) => {
         if (wishlist.errors){
            customerDB.remove();
            return res.status(500).send({error: wishlist.message, message: "Error creating customer's wishlist"})
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

   customer.remove((err, customerDB) => {
      if (err){
         return res.status(500).send({error: err.message, message: "Error deleting customer"});
      }

      return res.status(200).send({message: "Customer successfully deleted"});
   })
};

const _patchCustomer = async (req, res) => {
   
   const customer = Customer.findOne({email: req.body.email});

   if (!customer){
      return res.status(404).send({message: "Customer not found"});
   }

   if (req.body.name){
      customer.name = req.body.name;
      
      customer.save((err, customerDB) => {
         if (err){
            return res.status(500).send({error: err.message, message: "Error updating customer"});
         }

         return res.status(200).send({email: customerDB.email, name: customerDB.name});
      });
   }

   return res.status(204).send({message: "No changes made"});

}

module.exports = {
   getCustomer: _getCustomer,
   postCustomer: _postCustomer,
   deleteCustomer: _deleteCustomer,
   patchCustomer: _patchCustomer
}