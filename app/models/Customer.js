const mongoose = require('mongoose');

const customer = {

   name: {
      type: String,
      required: true
   },

   email: {
      type: String,
      required: true
   }

}

const customerSchema = mongoose.Schema(customer, { versionKey: false });

module.exports = customerSchema;