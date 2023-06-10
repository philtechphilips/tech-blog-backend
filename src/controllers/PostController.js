const Post = require("../models/Post");
const multer = require("multer");
const sharp = require("sharp");

// Create Post Route

const upload = multer({});
 
const newPost = async function (req, res) {
  try {
    const author = req.user.username;
    const categories = req.body.category;
    const post = new Post({ ...req.body, author, categories });
    await post.save();
    res.status(200).send();
  } catch (e) {
    if (e.code === 11000) {
      res.status(422).json({ error: "Duplicate blog title detected!" });
    } else {
      res.status(400).send(e);
    }
  }
};

const getPost = async function (req, res) {
  const category = req.query.category;

  try {
    let post;
    if (category) {
      post = await Post.find({ categories: category });
    } else {
      post = await Post.find();
    }
    res.status(200).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
};

const editPost = async function (req, res) {
  const updates = Object.keys(req.body); // Get the keys (property names) from the request body
  const allowedUpdates = ["description", "title"]; // Define an array of allowed updates
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  ); // Check if all updates are allowed

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" }); // If any update is not allowed, send an error response
  }

  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      return res.status(404).send({ error: "Post not found!" });
    }
    updates.forEach((update) => (post[update] = req.body[update]));
    await post.save();
    res.status(200).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deletePost = async function (req, res) {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id });
    if (!post) {
      return res.status(404).send({ error: "Post not found!" });
    }
    res.status(200).send(post);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getSpecificPost = async function (req, res) {
  try {
    const post = await Post.findById({ _id: req.params.id });
    res.status(200).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
};

const searchPost = async function (req, res) {
  const key = req.params.key;
  console.log(key);
  try {
    if (!key) {
      return res.status(400).json({ error: "Search key is required." });
    }

    const searchResults = await Post.find({ $text: { $search: key } });

    res.status(200).json(searchResults);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while performing the search." });
  }
};

module.exports = {
  newPost,
  getPost,
  editPost,
  deletePost,
  getSpecificPost,
  searchPost
};
