const express = require('express');
require('./db/mongoose')
const userRoute = require('./routes/user')
const taskRoute = require('./routes/task')

const app = express()
const PORT = process.env.PORT || 8080;
app.get('/',async (req,res)=>{
    res.send("Hello Express!")
})
app.use(express.json())
app.use(userRoute)
app.use(taskRoute)

app.listen(PORT,()=>console.log(`Server running on PORT:${PORT}`))