const express = require('express');
const router = express.Router()
const multer = require('multer')//used to upload img or videos using path name
const { CreateUsers, UserLogIn,otpVerification } = require('../controller/usercontroller')
const { CreateAdmin, getAllUserData,AdminLogIn } = require('../controller/adminController')
const { CreateShopkeeper,ShopkeeperLogIn } = require('../controller/shopkeeperController')
const {userAuth}=require('../middleware/userAuth')

const upload = multer({ storage: multer.diskStorage({}), })

// User API's
router.post('/CreateUsers', upload.single('profileimg'), CreateUsers)
router.post('/UserLogIn', upload.single(), UserLogIn)
router.post('/otpVerification/:userid',otpVerification)

// Admin Api's
router.post('/CreateAdmin', upload.single(), CreateAdmin)
router.post('/AdminLogIn', upload.single(), AdminLogIn)
router.get('/getAllUserData',userAuth, getAllUserData)

// Shopkeeper API's
router.post('/CreateShopkeeper', upload.single(), CreateShopkeeper)
router.post('/ShopkeeperLogIn', upload.single(), ShopkeeperLogIn)



router.all('/*', (req, res) => {
    return res.status(400).send({ status: false, msg: 'Invalid Url' })
})

module.exports = router;