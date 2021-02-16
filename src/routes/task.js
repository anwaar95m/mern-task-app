/** @format */

const express = require("express");
const Task = require("../models/task");
const router = express.Router();
const auth = require("../middlewares/auth")


//Adding new Tasks
router.post("/tasks",auth,  async (req, res) => {
  const task = new Task({...req.body,owner: req.user._id});
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send();
  }
});


//Getting Tasks
router.get("/tasks",auth,async (req, res) => {
  try {
    await req.user.populate('tasks').execPopulate()
    res.status(200).send(req.user.tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth , async (req, res) => {
  const _id = req.params.id;

  try {
    const found = await Task.findOne({_id,owner: req.user._id});
    if (!found) {
      return res.status(404).send();
    }
    res.status(200).send(found);
  } catch (error) {
    res.status(500).send();
  }
});

//Deleting Tasks
// router.delete("/tasks", auth,async (req, res) => {
//   try {
//     const toDelete = await Task.deleteMany({});
//     if (!toDelete) {
//       return res.status(404).send();
//     }
//     res.status(200).send("Deleted tasks successfully!");
//   } catch (error) {
//     res.status(500).send();
//   }
// });

router.delete("/tasks/:id", auth , async (req, res) => {
  const _id = req.params.id;
  try {
    const toDelete = await Task.findOneAndDelete({_id ,owner: req.user._id});
    if (!toDelete) {
      return res.status(404).send();
    }
    res.status(200).send("Deleted task successfully!");
  } catch (error) {
    res.status(500).send();
  }
});

//Updating Tasks
router.patch("/tasks/:id", auth , async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description","completed"];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
  
    if(!isValidOperation){
        return res.status(400).send("Invalid Update!")
    }
  try {
    const task = await Task.findOne({_id , owner: req.user._id});
    updates.forEach(update => task[update] = req.body[update])
    await task.save()
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;
