const mongoose = require('mongoose');
const customerSchema = require('../models/Customer');
const Customer = mongoose.model("Customer", customerSchema)

const _getCustomer = async (req, res) => {

   const customer = await Customer.findOne({email: req.params.email})

   if (!customer){
      return res.send({message: "Customer not found!"}).status(404);
   }

   return res.send({email: customer.email, name: customer.name}).status(200);
};

const _postCustomer = async (req, res) => {

   let customer = await Customer.findOne({email: req.body.email});

   if (customer){
      return res.send({message: "E-mail address registration already exists"}).status(400);
   }

   customer = new Customer({name: req.body.name, email: req.body.email});

   customer.save((err, customerDB) => {
      if (err) {
         return res.send({error: err.message, message: "Error creating new customer"}).status(500);
      }

      return res.send({message: "Customer created successfully"}).status(200);
   })
   
};

const _deleteCustomer = async (req, res) => {
   const customer = await Customer.findOne({email: req.body.email});

   if (!customer){
      return res.send({message: "Customer not found"}).status(404);
   }

   customer.remove((err, customerDB) => {
      if (err){
         return res.send({error: err.message, message: "Error deleting customer"}).status(500);
      }

      return res.send({message: "Customer successfully deleted"}).status(200);
   })
};

const _patchCustomer = async (req, res) => {
   
   const customer = Customer.findOne({email: req.body.email});

   if (!customer){
      return res.send({message: "Customer not found"}).status(404);
   }

   if (req.body.name){
      customer.name = req.body.name;
      
      customer.save((err, customerDB) => {
         if (err){
            return res.send({error: err.message, message: "Error updating customer"}).status(500);
         }

         return res.send({email: customerDB.email, name: customerDB.name}).status(200);
      });
   }

   return res.send({message: "No changes made"}).status(204);

}

module.exports = {
   getCustomer: _getCustomer,
   postCustomer: _postCustomer,
   deleteCustomer: _deleteCustomer,
   patchCustomer: _patchCustomer
}