const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/user");
const initialize = require("./config/db")
const app = express();

// Setup middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(
  bodyParser.json({ limit: "50mb", extended: true, parameterLimit: "50mb" })
);
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: "100000" }));

app.use("/api/auth", authRoutes);

initialize()

app.get("/", (req, res) => {
  res.send({
    status: 200,
    message: "Welcome to my Tech Blog",
  });
});

app.use(function (req, res, next) {
  res
    .status(404)
    .send({ responseCode: 404, message: "Invalid resource URL", data: [] });
  next();
});

module.exports = app;
