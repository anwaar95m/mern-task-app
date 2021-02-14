const express = require('express');
const User = require('../models/userModel');
const router = express.Router();


//Getting Users
router.get("/users",(req,res) => {
    const _id = req.params.id
    User.find({}).then((userList)=> {
        res.status(200).send(userList)
    }).catch(err => res.status(500).send(err))
})

router.get("/users/:id",(req,res) => {
    const _id = req.params.id
    User.findById(_id).then((user)=> {
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)
    }).catch(err => res.status(500).send(err))
})

//Adding new Users
router.post("/users",(req,res) => {
    const user = new User(req.body)
    user.save().then(()=> res.status(201).send(user)).catch(err => res.status(400).send(err))
})

//Deleting Users
router.delete("/users",(req,res) => {
    const name = req.params.name
    User.deleteMany({name}).then((user)=> {
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(`Deleted users successfully!`)
    }).catch(err => res.status(500).send(err))
})

router.delete("/users/:id",(req,res) => {
    const _id = req.params.id
    User.findByIdAndDelete(_id).then((user)=> {
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send('Deleted user successfully!')
    }).catch(err => res.status(500).send(err))
})

//Updating Users
router.patch("/users/:id",(req,res) => {
    const _id = req.params.id;
    const updatedData = {"name": "Ahsan"}

    User.findByIdAndUpdate(_id,updatedData).then((user)=> {
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send('Updated user successfully!')
    }).catch(err => res.status(500).send(err))
})

module.exports = router;