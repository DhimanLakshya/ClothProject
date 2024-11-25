const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.NodeMailerEmail,
        pass: process.env.NodeMailerPassword
    }   
});


module.exports.OTPSender =async(email,name,randomOtp)=>{
    try{
        const info = await transporter.sendMail({
            from: '"Lakshya 👻😊💕😊" <your-email@gmail.com>', 
            to: email, 
            subject: "Welcomoe to LD ",
            
            html: `
            <div style="background-color:#16253D;padding:20px;color:#fff;font-family:Arial, sans-serif;border-radius:10px;">
                <h2 style="color:#FF4500;">MoviesAll</h2>
                <p>Hi ${name},</p>
                <p>Please find your One Time Password (OTP) for reset password below:</p>
                <div style="background-color:#fff;color:#000;font-size:24px;font-weight:bold;text-align:center;padding:10px;margin:20px 0;border-radius:5px;">
                    ${randomOtp}
                </div>
                <p>The OTP is valid for 5 minutes.</p>
                <p>For account safety, do not share your OTP with others.</p>
                <br>
                <p>Regards,</p>
                <p>Team MoviesAll</p>
            </div>
            `,
        });
    }
    catch(e){console.log(e);}
}