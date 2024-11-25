const cloudinary=require('cloudinary').v2;
require('dotenv').config() //jab variable ko use kre g to variable ko define krege outherwise no need to define variable

cloudinary.config({
    cloud_name:process.env.Cloudname,
    api_key:process.env.APIkey,
    api_secret:process.env.APIsecret
});

module.exports.ImageURL = async(img)=>{
    try{
        
        const uploadResult = await cloudinary.uploader.upload(img)
        .catch((error) => {console.log(error)});
        return uploadResult.secure_url
    }
    catch(e) { return res.status.send({status:false, msg:e.message})}
}