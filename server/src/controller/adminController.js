const userModel = require('../models/usermodules')
const { errorHandle } = require('../errorHandling/errorhandlings')
const bcrypt = require('bcrypt')



module.exports.CreateAdmin = async (req, res) => {
    try {

        const data = req.body;
        
        if (data.password==undefined) return res.status(400).send({ status: false, msg: "pls Provivded Password" })
        if (data.role=='Customer'||data.role=='Shopkeeper') return res.status(400).send({ status: false, msg: "you are not Authorised for this role" })

        const bcryptPassword = await bcrypt.hash(data.password, 10)
        req.body.password = bcryptPassword
        req.body.role = 'Admin'

        const UserDB = await userModel.create(data)
        return res.status(201).send({ status: true, msg: "Successfully Created Data", data: UserDB })
    }
    catch (e) { return errorHandle(e,res) }
}


module.exports.getAllUserData = async (req, res) => {
    try {

        const data = await userModel.find()
        return res.status(200).send({ status: true, data: data })
    }
    catch (e) { return res.status(500).send({ status: false, msg: e.message }) }

}
