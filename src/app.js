const express = require('express');
require('./db/mongoose')
const userRoute = require('./routes/userRoutes')
const taskRoute = require('./routes/taskRoutes')

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use('/',userRoute)
app.use('/',taskRoute)

app.listen(PORT,()=>console.log(`Server running on PORT:${PORT}`))