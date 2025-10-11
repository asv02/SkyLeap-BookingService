const express = require("express");
const { serverConfig, logger } = require("./config");
const apiroutes = require("./routes");

const app = express();

app.use("/api", apiroutes);


app.listen(serverConfig.PORT, () => {
  console.log(`Server running on:`, serverConfig.PORT);
  logger.info("Server started successfully")
});
