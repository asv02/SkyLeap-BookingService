const express = require("express");
const { serverConfig, logger } = require("./config");
const apiroutes = require("./routes");
const { cronJobs } = require("./utils");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api", apiroutes);

app.listen(serverConfig.PORT, () => {
  cronJobs();
  console.log(`Server running on:`, serverConfig.PORT);
  logger.info("Server started successfully");
});
