const express = require('express');
const Task = require('../models/taskModel');
const router = express.Router();

//Getting Tasks
router.get("/task",(req,res) => {
    console.log("req in get task",req.params)
    Task.find({}).then((taskList)=> {
        res.status(200).send(taskList)
    }).catch(err => res.status(500).send(err))
})


router.get("/task/:id",(req,res) => {
    console.log("req.params.id",req.params.id)
    const _id = req.params.id
    Task.findById(_id).then((task)=> {
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    }).catch(err => res.status(500).send(err))
})

//Adding new Tasks
router.post("/task",(req,res) => {
    const task = new Task(req.body)
    task.save().then(()=> res.status(201).send(task)).catch(err => res.status(400).send(err))
})

//Deleting Tasks
// router.delete("/task",(req,res) => {
//     Task.deleteMany({}).then((deletedTasks)=> {
//         if(!deletedTasks){
//             return res.status(404).send()
//         }
//         res.status(200).send('Deleted task successfully!')
//     }).catch(err => res.status(500).send(err))
// })


router.delete("/task/:id",(req,res) => {
    const _id = req.params.id
    Task.findByIdAndDelete(_id).then((task)=> {
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send('Deleted task successfully!')
    }).catch(err => res.status(500).send(err))
})

//Updating Tasks
router.patch("/task/:id",(req,res) => {
    const _id = req.params.id;
    const updatedData = {"description": "Sleep now"}
    Task.findByIdAndUpdate(_id, updatedData).then((task)=> {
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send('Updated task successfully!')
    }).catch(err => res.status(500).send(err))
})


module.exports = router;