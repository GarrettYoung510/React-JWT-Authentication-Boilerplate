const passport = require("passport");
// get that user model
const User = require("./../models/User");
const config = require("./../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// Create local strategy
// By default LocalStrategy it is expecting a username(not an email) and a password
// We override that with the following code
const localOptions = { usernameField: "email" };
// creates new local strategy to login
const localLogin = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    try {
      // find user with that email
      const user = await User.findOne({ email });
      // if no user found with that email
      if (!user) {
        // done is equivalent to next as if it was a middleware, or else route hangs
        return done(null, false);
      }
      // done and next similar
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        }
        return done(null, user);
      });
    } catch (e) {
      done(e, false);
    }
  }
);

// Setup options for Jwt Strategy
// JSON Web Tokens
// we need to tell our strategy where to look for the token
const jwtOptions = {
  // Tells JWT strategy that whenever a request comes in and we ant passport to handle it, it needs to look in the header, for the property called "authorization"
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  // Tells JWT Strategy what secret we used to encode the token so that it can decode it
  secretOrKey: config.secret
};

// we are going to get the payload argument from an incomign request
// the payload argument is coming from the function that we will create in auth Route
// done is the function we call once we try to authenticate the user
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (e) {
    done(e, false);
  }
});

// This tells passport that we declared these strategies
// The local login says we have a strategy called "Local"
// The jwtLogin says we have a strategy called jwt

// When we say passport.authenticate('jwt')
// passport will look for a strategy called 'jwt'
passport.use(localLogin);
passport.use(jwtLogin);
// gives jwt strategy
