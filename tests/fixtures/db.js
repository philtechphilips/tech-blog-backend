const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/User");
const Category = require("../../src/models/Category");
const Post = require("../../src/models/Post");
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  username: "mike",
  email: "mike@gmail.com",
  password: "PassM!!!!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  username: "Philip",
  email: "philip@gmail.com",
  password: "PassM!!!!",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

const categoryId = new mongoose.Types.ObjectId();
const categoryOne = {
  _id: categoryId,
  name: "Test Categry"
};

const postId = new mongoose.Types.ObjectId();
const postOne = {
  _id: postId,
  title: "New Post",
  description: "Post Description",
  author: userOneId,
  category: "post-category"
};




const setupDatabase = async () => {
  await User.deleteMany();
  await Category.deleteMany();
  await Post.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Category(categoryOne).save();
  await new Post(postOne).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  categoryOne,
  categoryId,
  postOne,
  postId,
  setupDatabase,
};
