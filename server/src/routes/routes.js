const express = require('express');

const router = express.Router()
router.get('/Lakshya',(req,res)=>{
    return res.send({status:true,msg:"hi Lakshya"})
})

module.exports = router;