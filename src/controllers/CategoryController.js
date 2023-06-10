const router = require("express").Router();
const Category = require("../models/Category");
const cors = require("cors");

router.use(cors());

router.use(
  cors({
    origin: "*",
  })
);

const newCategory = async function (req, res) {
  try {
    const category = new Category({ ...req.body });
    await category.save();
    res.status(200).send();
  } catch (e) {
    if (e.code === 11000) {
      res.status(422).json({ error: "Category is already taken" }); // sending an error response as JSON with the error message
    } else {
      res.status(400).send(e); // Sending an error response with the error object
    }
  }
};

const getCategory = async function (req, res) {
  try {
    const category = await Category.find();
    res.status(200).send(category);
  } catch (e) {
    res.status(400).json(e);
  }
};

const editCategory = async function (req, res) {
  const updates = Object.keys(req.body); // Get the keys (property names) from the request body
  const allowedUpdates = ["name"]; // Define an array of allowed updates
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  ); // Check if all updates are allowed

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" }); // If any update is not allowed, send an error response
  }

  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(404).send({ error: "Category not found!" });
    }
    updates.forEach((update) => (category[update] = req.body[update]));
    await category.save();
    res.status(200).send(category);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteCategory = async function (req, res) {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id });
    if (!category) {
      return res.status(404).send({ error: "Post not found!" });
    }
    res.status(200).send(category);
  } catch (e) {
    res.status(400).send(e);
  }
};


const getSpecificCategory = async function (req, res) {
    try {
        const category = await Category.findById({ _id: req.params.id });
        res.status(200).send(category);
      } catch (e) {
        res.status(400).send(e);
      }
  }; 

module.exports = { newCategory, getCategory, editCategory, deleteCategory, getSpecificCategory };
