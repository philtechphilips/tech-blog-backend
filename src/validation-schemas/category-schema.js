const Joi = require("joi");

const CategorySchema = Joi.object({
    name: Joi.string().min(3).required(),
});



module.exports = {
  CategorySchema
};