const dotenv = require("dotenv");

dotenv.config();

const config = {
  baseUrl: process.env.BASE_URL || "http://localhost",
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI,

  jwtSecret: process.env.JWT_SECRET || "mysecretkey",
};

module.exports = config;
