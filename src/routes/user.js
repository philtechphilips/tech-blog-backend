const router = require("express").Router();
const User = require("../models/User");
const cors = require("cors");
const auth = require("../middlewares/auth");
const { loginValidator, signupValidator } = require("../validators/user-validator");
const UserController = require('../controllers/UserController');

router.use(cors());

router.use(
  cors({
    origin: "*",
  })
);

// Register Routes
router.post("/register", signupValidator, UserController.register);
router.post("/login", loginValidator, UserController.login);

module.exports = router;