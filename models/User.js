// dependencies
const mongoose = require("mongoose");
// mongoose schema
const Schema = mongoose.Schema;

// create the new schema
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
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
