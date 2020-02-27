const mongoose = require('mongoose');

const user = {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  }
};

const userSchema = mongoose.Schema( user, {versionKey: false});

module.exports = userSchema;