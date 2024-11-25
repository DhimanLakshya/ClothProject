const express=require('express');
const router=require('./routes/routes')
const mongoose=require('mongoose');


const app=express();
app.use(express.json())

const port=5000;

mongoose.connect('mongodb+srv://ldhiman450:LsStTFJKHDKUbNeP@cluster0.zhq9d.mongodb.net/test')
.then(()=>{console.log('MongoDB Connected');})
.catch((e)=>{console.log(e);})


app.use('/',router)
app.listen(port,()=>{console.log(`Server is Running at &{port}`,port);})