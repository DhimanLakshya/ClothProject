const userModel = require('../models/usermodules')
const { errorHandle } = require('../errorHandling/errorhandlings')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



module.exports.CreateAdmin = async (req, res) => {
    try {

        const data = req.body;

        if (data.password == undefined) return res.status(400).send({ status: false, msg: "pls Provivded Password" })
        if (data.role == 'Customer' || data.role == 'Shopkeeper') return res.status(400).send({ status: false, msg: "you are not Authorised for this role" })

        const bcryptPassword = await bcrypt.hash(data.password, 10)
        req.body.password = bcryptPassword
        req.body.role = 'Admin'

        const UserDB = await userModel.create(data)
        return res.status(201).send({ status: true, msg: "Successfully Created Admin Data", data: UserDB })
    }
    catch (e) { return errorHandle(e, res) }
}


module.exports.getAllUserData = async (req, res) => {
    try {
        
        const data = await userModel.find({role: 'Customer'})
        return res.status(200).send({ status: true, data: data })
    }
    catch (e) { return res.status(500).send({ status: false, msg: e.message }) }

}

module.exports.AdminLogIn = async (req, res) => {
    try {

        const data = req.body;

        if (data.password == undefined) return res.status(400).send({ status: false, msg: "pls Provivded Password" })
        if (data.email == undefined) return res.status(400).send({ status: false, msg: "pls Provivded Email" })

        const checkMailId = await userModel.findOne({ email: data.email, role: "Admin" })

        if (!checkMailId) return res.status(404).send({ status: false, msg: "Not found Account" })

        const bcryptPassword = await bcrypt.compare(data.password, checkMailId.password)


        if (!bcryptPassword) return res.status(400).send({ status: false, msg: "Wrong Password" })
        const CustomerId = checkMailId._id.toString();

        const token = jwt.sign({ UserId: CustomerId, AuthorName: checkMailId.name }, process.env.AdminTokenKey, { expiresIn: '12h' })

        return res.status(200).send({ status: true, msg: "Successfully Create Shopkeeper token", UserId: CustomerId, token: token })
    }
    catch (e) { return errorHandle(e, res) }
}