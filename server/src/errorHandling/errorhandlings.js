exports.errorHandle = (error, res) => {
//    console.log(error.name);
    if (error.name == "TypeError" || error.name == "ValidationError" || 
        error.name=='TokenExpiredError' || error.name == 'JsonWebTokenError' || 
        error.name =='SyntaxError') {
        return res.status(400).send({ status: false, msg: error.message });
    }

    if (error.name =='CastError') {
        return res.status(400).send({ status: false, msg: 'Invalid ID' });
    }
    
    if (error.code == 11000) {
        return res.status(400).send({
            status: false,
            msg: `Duplicate value provided at ${Object.keys( error.keyValue)} ${Object.values(error.keyValue)}`});
    }
    return res.status(500).send({status:false,msg:error.message});
}
