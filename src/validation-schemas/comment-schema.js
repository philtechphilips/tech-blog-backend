const Joi = require("joi");

const CommentSchema = Joi.object({
  comment: Joi.string().min(3).required(),
});

module.exports = {
  CommentSchema,
};  
