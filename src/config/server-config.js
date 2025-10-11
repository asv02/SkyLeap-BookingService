const dotenv = require("dotenv");
dotenv.config(); // dotenv->Object, now dotenv.config()-gives a object(process.env) which has all environmental variables

module.exports = {
  PORT: process.env.PORT,
};
