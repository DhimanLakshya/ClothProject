const express = require('express');
const router = express.Router()
const { CreateUsers } = require('../controller/usercontroller')

router.post('/Lakshya', CreateUsers)

router.all('/*',(req,res)=>{
    return res.status(400).send({status:false,msg:'Invalid Url'})
})

module.exports = router;