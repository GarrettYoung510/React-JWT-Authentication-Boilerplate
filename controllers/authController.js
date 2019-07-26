// give us access to all the data that models exports
const db = require("./../models");

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
        const existingUser = await db.User.findOne({email});
        if(existingUser){
            // 422 error
            return res.status(422).json({ error: 'Email is in use'});
        }
        // if user does not exist
        // shorthand for email = email and password = password variables
        const user = new db.User({ email, password });
        // save the user
        await user.save();
        res.json(user);
    } catch (e) {
        // send 404 status and what error they got back
        res.status(404).json({e});
    }
  },

  signIn: (req, res) => {
      res.send('im hit');
  }
};
