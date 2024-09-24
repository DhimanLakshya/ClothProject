
const express = require('express');
const mongoose = require('mongoose');

const app = express()

const portId = 5000;
let DB = 'mongodb+srv://ldhiman450:LsStTFJKHDKUbNeP@cluster0.zhq9d.mongodb.net/project'

mongoose.connect(DB)
    .then(() => { console.log('MongoDB connected') })
    .catch((err) => { console.log(err); })

app.listen(portId, () => { console.log(`Server is running ${portId}`); })