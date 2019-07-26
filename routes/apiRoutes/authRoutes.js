// require express router
const router = require("express").Router();
const authController = require('./../../controllers/authController');

// require our sign in middleware
const passportService = require('./../../services/passport.js');
const authMiddleware = require('./../../middlewares/authMiddlewares.js');

// /auth/signup
router.route("/signup").post(authController.signUp);

// /auth/signin
router.route('/signin').post(authMiddleware.requireSignIn, authController.signIn);

module.exports = router;
