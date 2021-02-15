/** @format */

const express = require("express");
const Task = require("../models/task");
const router = express.Router();

//Getting Tasks
router.get("/tasks", async (req, res) => {
  try {
    const taskList = await Task.find({});
    res.status(200).send(taskList);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await Task.findById(_id);
    if (!found) {
      return res.status(404).send();
    }
    res.status(200).send(found);
  } catch (error) {
    res.status(500).send();
  }
});

//Adding new Tasks
router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send();
  }
});

//Deleting Tasks
router.delete("/tasks", async (req, res) => {
  try {
    const toDelete = await Task.deleteMany({});
    if (!toDelete) {
      return res.status(404).send();
    }
    res.status(200).send("Deleted tasks successfully!");
  } catch (error) {
    res.status(500).send();
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const toDelete = await Task.findByIdAndDelete(_id);
    if (!toDelete) {
      return res.status(404).send();
    }
    res.status(200).send("Deleted task successfully!");
  } catch (error) {
    res.status(500).send();
  }
});

//Updating Tasks
router.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description","completed"];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
  
    if(!isValidOperation){
        return res.status(400).send("Invalid Update!")
    }
  try {
    const task = await Task.findById(req.params.id);
    updates.forEach(update => task[update] = req.body[update])
    await task.save()
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send("Updated task successfully!");
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;