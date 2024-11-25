const userModel = require('../models/usermodules')
const { errorHandle } = require('../errorHandling/errorhandlings')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { ImageURL } = require('../CLOUDINARY/UploadImg')
const { OTPSender } = require('../nodemailer/MailSender')
require('dotenv').config() //jab variable ko use kre g to variable ko define krege outherwise no need to define variable


module.exports.CreateUsers = async (req, res) => {
    try {

        const imgdata = req.file;
        const { password, name, email } = req.body

        if (!password) {
            return res.status(400).send({ status: false, msg: "pls Provivded Password" })
        }


        const bcryptPassword = await bcrypt.hash(password, 10)
        req.body.password = bcryptPassword
        req.body.role = 'Customer'

        if (imgdata) {
            const result = await ImageURL(imgdata.path);
            console.log(result);
            req.body.profileimg = result;
        }

        let randomOtp = Math.floor(1000 + Math.random() * 9000);
        req.body.UsertOtp = randomOtp


        const Checkuser = await userModel.findOneAndUpdate(
            { email: email },
            {$set:{UsertOtp:randomOtp}},
            {new:true}
        )

        
        if (Checkuser) {
        if(Checkuser.isVerify=='true') {return res.status(200).send({ status: true, msg: "Already Verify User Pls LogIn" })}
            OTPSender(email, name, randomOtp)
            return res.status(200).send({ status: true, msg: "Successfully Otp Send" })

        }

        const UserDB = await userModel.create(req.body)

        OTPSender(email, name, randomOtp)

        return res.status(201).send({ status: true, msg: "Successfully Created Data", data: UserDB })
    }
    catch (e) { return errorHandle(e, res) }
}

exports.otpVerification = async (req, res) => {
    try {
        const id = req.params.userid;
        const otp = req.body.OTP;

        
        const checkUser = await userModel.findById({ _id: id })
        
        if (!checkUser) { return res.status(400).send({ status: false, msg: 'User not found. Please signup' }) }
        if (!otp) { return res.status(400).send({ status: false, msg: 'Please Provide Otp' }) }
       
       
        if ((checkUser.isVerify == 'true')) { return res.status(400).send({ status: false, msg: 'User Already Verifyed' }) }
        if (!(otp == checkUser.UsertOtp)) { return res.status(400).send({ status: false, msg: 'Incorrect OTP' }) }
        await userModel.findByIdAndUpdate({ _id: id }, { $set: { isVerify: true } })
        res.status(200).send({ status: true, msg: 'OTP verifyed successfully' })
    }
    catch (e) { return res.status(500).send({ status: false, msg: e.message }) }
}


module.exports.UserLogIn = async (req, res) => {
    try {

        const data = req.body;

        if (data.password == undefined) return res.status(400).send({ status: false, msg: "pls Provivded Password" })
        if (data.email == undefined) return res.status(400).send({ status: false, msg: "pls Provivded Email" })

        const checkMailId = await userModel.findOne({ email: data.email, role: "Customer", isVerify:true })

        if (!checkMailId) return res.status(404).send({ status: false, msg: "Not found Account pls Signup and Verify Otp" })

        const bcryptPassword = await bcrypt.compare(data.password, checkMailId.password)

        if (!bcryptPassword) return res.status(400).send({ status: false, msg: "Wrong Password" })
        const CustomerId = checkMailId._id.toString();

        const token = jwt.sign({ UserId: CustomerId, AuthorName: checkMailId.name }, process.env.UserTokenKey, { expiresIn: '12h' })

        return res.status(200).send({ status: true, msg: "Successfully Create User token", UserId: CustomerId, token: token })
    }
    catch (e) { return errorHandle(e, res) }
}

module.exports.resetOtp = async (req, res) => {
    try{

    }
    catch (e) { return errorHandle(e, res) }  
}
