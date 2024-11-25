module.exports.createuser=(req,res)=>{
    try{
        return res.status(500).send({status:false,msg:'hello Backend'})

    }
    catch (e){
        return res.status(500).send({status:false,msg:e.message})
    }

}