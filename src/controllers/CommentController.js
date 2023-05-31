const router = require("express").Router();
const Comment = require("../models/Comment");
const cors = require("cors");

router.use(cors());

router.use(
  cors({
    origin: "*",
  })
);

const createComment = async function (req, res) {
  try {
    const comment = new Comment({ ...req.body, username });
    await comment.save();
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

const getComment = async function (req, res) {
  try {
    const comment = await Comment.find({ postId: req.params.id });
    res.status(200).send(comment);
  } catch (e) {
    res.status(400).send(e); // Sending an error response with the error object
  }
};

module.exports = { createComment, getComment };
