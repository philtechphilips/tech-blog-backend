const {
    CommentSchema
  } = require("../validation-schemas/category-schema");

  const commentValidator = async(req, res, next) => {
    try {
       await CommentSchema.validateAsync(req.body);
      return next();
    } catch (error) {
        return res.send({ statusCode: 422, message: error.message })
    }
  };


  module.exports = { commentValidator }