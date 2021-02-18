/** @format */

const express = require("express");
require("./db/mongoose");
require('dotenv').config()
const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");

const app = express();
app.get("/", async (req, res) => {
  res.send("Server running...");
});

app.use(express.json());
app.use(userRoute);
app.use(taskRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
