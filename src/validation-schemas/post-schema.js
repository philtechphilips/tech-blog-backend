const Joi = require("joi");

const PostSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  categories: Joi.string().min(3).required(),
});

module.exports = {
  PostSchema,
};
