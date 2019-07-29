const router = require("express").Router();
const authRoutes = require("./authRoutes");

// require passport
const passportService = require('./../../services/passport');

const authMiddleware = require("./../../middlewares/authMiddlewares.js");
// /.api prepended to these routes

// invokes our jwt strategy
router.route("/test").get(authMiddleware.requireAuth, (req, res) => {
  res.send(req.user);
});
// require all these to protect our routes

router.use("/auth", authRoutes);

module.exports = router;
