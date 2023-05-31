const app = require("./app");
const chalk = require("chalk");
const config = require("./config/index");

app.listen(config.port, () => {
  console.log(
    `${chalk.blue(
      `Tech Blog is now running on ${config.baseUrl}:${config.port}`
    )}`
  );
});
