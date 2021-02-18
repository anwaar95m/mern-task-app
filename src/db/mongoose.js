const mongoose = require("mongoose");
require('dotenv').config()

const connectionUrl = process.env.DB_URL;
mongoose.connect(connectionUrl , {useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex: true , useFindAndModify: false});
