const userModel = require('../models/usermodules')
const bcrypt = require('bcrypt')
const { ValidName, Validemail, Validpass } = require('../validation/validations')


module.exports.CreateUsers = async (req, res) => {
    try {

        const data = req.body;
        const { name, email, password } = data//destructuring



        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Body Empty" })
        if (!name || name.trim().length == 0) return res.status(400).send({ status: false, msg: "Insert the value in Name and Provided Name" })
        if (!ValidName(name)) return res.status(400).send({ status: false, msg: "Inavlid Name" })
        if (!email || email.trim().length == 0) return res.status(400).send({ status: false, msg: "Insert the value in email and Provided email" })
        if (!Validemail(email)) return res.status(400).send({ status: false, msg: "Inavlid email" })
        if (!password || password.trim().length == 0) return res.status(400).send({ status: false, msg: "Insert the value in Password and Provided Password" })
        if (!Validpass(password)) return res.status(400).send({ status: false, msg: "Inavlid password" })

        const checkemail = await userModel.findOne({ email: email })
        if (checkemail) return res.status(200).send({ status: false, msg: "User Already Present" })

        const bcryptPassword = await bcrypt.hash(password, 10)
        req.body.password = bcryptPassword

        const UserDB = await userModel.create(data)
        return res.status(201).send({ status: true, msg: "Successfully Created Data", data: UserDB })
    }
    catch (e) { return res.status(500).send({ status: false, msg: e.message }) }
}

//another api
module.exports.getAllUserData = async (req, res) => {
    try {

        const data = await userModel.find()
        return res.status(200).send({ status: true, data: data })
    }
    catch (e) { return res.status(500).send({ status: false, msg: e.message }) }

}
