const express = require('express');
const router = express.Router()
const multer = require('multer')
const { CreateUsers, getAllUserData } = require('../controller/usercontroller')

const upload = multer({ storage: multer.diskStorage({}), })

router.post('/CreateUsers', upload.single(),CreateUsers)
router.get('/getAllUserData', getAllUserData)


router.all('/*', (req, res) => {
    return res.status(400).send({ status: false, msg: 'Invalid Url' })
})

module.exports = router;