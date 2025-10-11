const express = require("express");
const { PORT } = require("./config");
const apiroutes = require("./routes");

const app = express();

app.use("/api", apiroutes);


app.listen(PORT, () => {
  console.log(`Server running on:`, PORT);
});
