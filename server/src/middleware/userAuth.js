const jwt = require('jsonwebtoken')
const{errorHandle}=require('../errorHandling/errorhandlings')
require('dotenv').config()


module.exports.userAuth = async (req, res, next) => {
    try {
        const token = req.headers['x-api-key']
        // console.log(process.env.AdminTokenKey);
        if(!token) return res.status(400).send({ status: false, msg: 'pls Provided Token' })

        const verifyToken = jwt.verify(token,process.env.AdminTokenKey)
            next()
    }
    catch (e) { return errorHandle(e,res) }
}