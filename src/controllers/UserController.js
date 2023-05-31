const router = require("express").Router();
const User = require("../models/User");
const cors = require("cors");

router.use(cors());

router.use(
  cors({
    origin: "*",
  })
);

const register = async function (req, res) {
  const user = new User(req.body);
  try {
    await user.save(); // Saving the user to the database
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token }); // Sending a success response with the saved user object
  } catch (e) {
    if (e.code === 11000) {
      res.status(422).json({ error: "Email address is already taken" }); // sending an error response as JSON with the error message
    } else {
      res.status(400).send(e); // Sending an error response with the error object
    }
  }
};

const login = async function (req, res) {
  try {
    if (!req.body.email || !req.body.password) {
      throw new Error("Email and password are required");
    }
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const logout = async function (req, res) {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { register, login, logout };
