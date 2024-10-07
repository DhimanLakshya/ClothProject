
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/routes')
require('dotenv').config()

const app = express()
app.use(express.json())//used for getting the data from postman

const portId = 5000 || process.env.PORT ;


mongoose.connect(process.env.MongooseDB)
    .then(() => { console.log('MongoDB connected') })
    .catch((err) => { console.log(err); })

app.use('/',router) //using all API's written in router.js file
app.listen(portId, () => { console.log(`Server is running ${portId}`); })