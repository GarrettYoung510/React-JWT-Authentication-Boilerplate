// give us access to all the data that models exports
const db = require("./../models");
const jwt = require("jwt-simple");
const config = require("./../config.js");

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  // sub is subject
  // iat is issued at time
  // It is going to encode the whole 1st object and add our secret to it thus JSON web token
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

module.exports = {
  // signup method async and await & try catch
  signUp: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(422)
        .json({ error: "You must provide an email and password" });
    }
    // look for an existing user
    try {
      // await goes in try block
      const existingUser = await db.User.findOne({ email });
      if (existingUser) {
        // 422 error
        return res.status(422).json({ error: "Email is in use" });
      }
      // if user does not exist
      // shorthand for email = email and password = password variables
      const user = new db.User({ email, password });
      // save the user
      await user.save();
      //   sending user through token for user to forever authenticate our user
      res.json({ token: tokenForUser(user) });
    } catch (e) {
      // send 404 status and what error they got back
      res.status(404).json({ e });
    }
  },

  signIn: (req, res) => {
    res.send("im hit");
  }
};
