const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const env = require("dotenv");
const routes = require("./routes");
require("../src/database/connection");

env.config();

app.use(cors());
app.use(bodyParser.json());
app.options("*", cors());
app.use("/api", routes);
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
