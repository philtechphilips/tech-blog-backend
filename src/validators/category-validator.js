const {
    CategorySchema
  } = require("../validation-schemas/category-schema");

  const categoryValidator = async(req, res, next) => {
    try {
       await CategorySchema.validateAsync(req.body);
      return next();
    } catch (error) {
        return res.send({ statusCode: 422, message: error.message })
    }
  };


  module.exports = { categoryValidator }