// dependencies
const mongoose = require("mongoose");
// mongoose schema
const Schema = mongoose.Schema;
// how to validate npm package in google
const validator = require('validator');

const validateEmail = function(email){
  return validator.isEmail(email);  
};

// create the new schema
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    // validate that the email is correct format
    // takes an array or function [functiontocall, errormsg]
    validate: [validateEmail,
    'Please enter a valid email address'
    ],
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;

// OR

// module.exports = mongoose.model("User", userSchema);
