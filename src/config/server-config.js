const dotenv = require("dotenv");
dotenv.config(); // dotenv->Object, now dotenv.config()-gives a object(process.env) which has all environmental variables

module.exports = {
  PORT: process.env.PORT,
  SKYLEAP_BASE_SERVICE: process.env.SKYLEAP_BASE_SERVICE,
};
