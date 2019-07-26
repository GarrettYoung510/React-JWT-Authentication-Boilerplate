// dependencies
const mongoose = require("mongoose");
// for encryption
const bcrypt = require("bcryptjs");
// mongoose schema
const Schema = mongoose.Schema;
// how to validate npm package in google
const validator = require("validator");

const validateEmail = function(email) {
  return validator.isEmail(email);
};

// create the new schema
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    // validate that the email is correct format
    // takes an array or function [functiontocall, errormsg]
    validate: [validateEmail, "Please enter a valid email address"]
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", async function(next) {
  // to make this clearer for me, this = user
  const user = this;
  try {
    // create a salt - random 10 characters for encryption
    const salt = await bcrypt.genSalt();
    console.log('salt', salt);
    // create a hash - one way changes string into a hash
    // user password and salt will be hashed
    const hash = await bcrypt.hash(user.password, salt);
    console.log('hash', hash);
    // saves hash as the password instead of the users password
    user.password = hash;
    // so it does not hang
    next();
  } catch (e) {
    // so it moves on to what is next and error msg if one
    return next(e);
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword, callback){
  // so we know what this is defined as
  const user = this;
  try {
    // returns true or false comparison of passwords
    const isMatch = await bcrypt.compare(candidatePassword, user.password);
    // either return null or that it is a match
    callback(null, isMatch);
  } catch (e) {
    // callback the error
    callback(e);
  }
}; 

const User = mongoose.model("User", UserSchema);
module.exports = User;

// OR

// module.exports = mongoose.model("User", userSchema);
