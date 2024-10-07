const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes')

require('dotenv').config()
const app = express()


const PortId = 5000 || process.env.PORT;

mongoose.connect(process.env.MongooseDB)
    .then(() => { console.log('mongoDB connected'); })
    .catch((e) => { console.log(e); })

app.use('/',routes)
app.listen(PortId, () => { console.log(`server is running ${PortId}`); })