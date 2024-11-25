const express=require('express')
const { createuser } = require('../controller/controller')
const router=express.Router()

router.post('/createuser',createuser)

module.exports=router