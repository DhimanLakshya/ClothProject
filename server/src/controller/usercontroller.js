const userModel = require('../models/usermodules')
const { errorHandle } = require('../errorHandling/errorhandlings')
const bcrypt = require('bcrypt')



module.exports.CreateUsers = async (req, res) => {
    try {

        const data = req.body;
        
        if (data.password==undefined) return res.status(400).send({ status: false, msg: "pls Provivded Password" })
        if (data.role=='Admin'||data.role=='Shopkeeper') return res.status(400).send({ status: false, msg: "you are not Authorised for this role" })

        const bcryptPassword = await bcrypt.hash(data.password, 10)
        req.body.password = bcryptPassword
        req.body.role = 'Customer'

        const UserDB = await userModel.create(data)
        return res.status(201).send({ status: true, msg: "Successfully Created Data", data: UserDB })
    }
    catch (e) { return errorHandle(e,res) }
}

//another api
