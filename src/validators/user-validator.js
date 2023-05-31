const {
    LoginSchema,
    SignupSchema,
  } = require("../validation-schemas/user-schema");

  
  
  const signupValidator = async (req, res, next) => {
    try {
       await SignupSchema.validateAsync(req.body);
      return next();
    } catch (error) {
      return res.send({ statusCode: 422, message: error.message })
    }
  };

  module.exports = { signupValidator }