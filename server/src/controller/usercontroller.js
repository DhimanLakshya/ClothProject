const userModel = require('../models/usermodules')
const { errorHandle } = require('../errorHandling/errorhandlings')
const bcrypt = require('bcrypt')
const cloudinary=require('cloudinary').v2;
const jwt = require('jsonwebtoken');
require('dotenv').config() //jab variable ko use kre g to variable ko define krege outherwise no need to define variable

cloudinary.config({
    cloud_name:process.env.Cloudname,
    api_key:process.env.APIkey,
    api_secret:process.env.APIsecret
});

module.exports.CreateUsers = async (req, res) => {
    try {

        const data = req.body;
        const imgdata = req.file;

        if (!data.password){
            return res.status(400).send({ status: false, msg: "pls Provivded Password" })
        }
        if (data.role == 'Admin' || data.role == 'Shopkeeper') return res.status(400).send({ status: false, msg: "you are not Authorised for this role" })

        const bcryptPassword = await bcrypt.hash(data.password, 10)
        req.body.password = bcryptPassword
        req.body.role = 'Customer'

        if(imgdata){
            const result = await cloudinary.uploader.upload(imgdata.path);
            data.profileimg = result.secure_url;
            console.log(imgdata);
        }

        const UserDB = await userModel.create(data)
        return res.status(201).send({ status: true, msg: "Successfully Created Data", data: UserDB })
    }
    catch (e) { return errorHandle(e, res) }
}



module.exports.UserLogIn = async (req, res) => {
    try {

        const data = req.body;

        if (data.password == undefined) return res.status(400).send({ status: false, msg: "pls Provivded Password" })
        if (data.email == undefined) return res.status(400).send({ status: false, msg: "pls Provivded Email" })

        const checkMailId = await userModel.findOne({ email: data.email, role: "Customer" })

        if (!checkMailId) return res.status(404).send({ status: false, msg: "Not found Account" })

        const bcryptPassword = await bcrypt.compare(data.password, checkMailId.password)

        if (!bcryptPassword) return res.status(400).send({ status: false, msg: "Wrong Password" })
        const CustomerId = checkMailId._id.toString();

        const token = jwt.sign({ UserId: CustomerId, AuthorName: checkMailId.name }, process.env.UserTokenKey, { expiresIn: '12h' })

        return res.status(200).send({ status: true, msg: "Successfully Create User token", UserId: CustomerId, token: token })
    }
    catch (e) { return errorHandle(e, res) }
}


