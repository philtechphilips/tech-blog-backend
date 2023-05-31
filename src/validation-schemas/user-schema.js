const Joi = require("joi");

const SignupSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().min(3).required(),
  password: Joi.string().min(8).max(200).required(),
});


module.exports = {
  SignupSchema,
};