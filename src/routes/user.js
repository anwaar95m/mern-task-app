/** @format */

const express = require("express");
const User = require("../models/user");
const router = express.Router();

//Getting Users
router.get("/users", async (req, res) => {
  try {
    const userList = await User.find({});
    res.status(200).send(userList);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await User.findById(_id);
    if (!found) {
      return res.status(404).send();
    }
    res.status(200).send(found);
  } catch (error) {
    res.status(500).send();
  }
});

//Adding new Users
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send();
  }
});

//Logging In
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user);
  } catch (error) {
    res.status(400).send();
  }
});

//Deleting Users
router.delete("/users", async (req, res) => {
  const name = req.params.name;
  try {
    const deleted = await User.deleteMany({ name });
    if (!deleted) {
      return res.status(404).send();
    }
    res.status(200).send(`Deleted users successfully!`);
  } catch (error) {
    res.status(500).send();
  }
});

router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const toDelete = await User.findByIdAndDelete(_id);
    if (!toDelete) {
      return res.status(404).send();
    }
    res.status(200).send("Deleted user successfully!");
  } catch (error) {
    res.status(500).send();
  }
});

//Updating Users
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send("Invalid Update!");
  }
  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send("Updated user successfully!");
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;