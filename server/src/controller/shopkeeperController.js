const userModel = require('../models/usermodules')
const { errorHandle } = require('../errorHandling/errorhandlings')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')


module.exports.CreateShopkeeper = async (req, res) => {
    try {

        const data = req.body;

        if (data.password == undefined) return res.status(400).send({ status: false, msg: "pls Provivded Password" })
        if (data.role == 'Customer' || data.role == 'Admin') return res.status(400).send({ status: false, msg: "you are not Authorised for this role" })

        const bcryptPassword = await bcrypt.hash(data.password, 10)
        req.body.password = bcryptPassword
        req.body.role = 'Shopkeeper'

        const UserDB = await userModel.create(data)
        return res.status(201).send({ status: true, msg: "Successfully Created Data", data: UserDB })
    }
    catch (e) { return errorHandle(e, res) }
}
module.exports.ShopkeeperLogIn = async (req, res) => {
    try {
       
        const data = req.body;

        if (data.password == undefined) return res.status(400).send({ status: false, msg: "pls Provivded Password" })
        if (data.email == undefined) return res.status(400).send({ status: false, msg: "pls Provivded Email" })

        const checkMailId = await userModel.findOne({ email: data.email, role: "Shopkeeper" })

        if (!checkMailId) return res.status(404).send({ status: false, msg: "Not found Account" })

        const bcryptPassword = await bcrypt.compare(data.password, checkMailId.password)

      
        if (!bcryptPassword) return res.status(400).send({ status: false, msg: "Wrong Password" })
        const CustomerId = checkMailId._id.toString();
        
        const token = jwt.sign({UserId:CustomerId, AuthorName:checkMailId.name},process.env.ShopkeeperTokenKey,{expiresIn:'12h'})

        return res.status(200).send({ status: true, msg: "Successfully Create Shopkeeper token", UserId: CustomerId, token: token })
    }
    catch (e) { return errorHandle(e, res) }
}

