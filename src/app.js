/** @format */

const express = require("express");
require("./db/mongoose");
const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 8080;

const multer = require("multer");

const upload = multer({
  dest: "images",
  limits: 1000000,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb("File must be a document");
    }
    cb(undefined, true);
  },
});

//Uploading user profile
app.post("/upload", upload.single("upload"), function (req, res) {
  res.send("Uploaded Profile Picture!");
});

app.get("/", async (req, res) => {
  res.send("Server running...");
});

app.use(express.json());
app.use(userRoute);
app.use(taskRoute);

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
