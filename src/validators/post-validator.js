const { PostSchema } = require("../validation-schemas/post-schema");

const postValidator = async (req, res, next) => {
  try {
    await PostSchema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res.send({ statusCode: 422, message: error.message });
  }
};

module.exports = { postValidator };
