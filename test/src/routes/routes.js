const express = require('express');
const router = express.Router();
const { CreateUser } = require('../controller/usercontroller')

router.post('/Lakshya', CreateUser)

router.all('/*', (req, res) => {
    return res.status(400).send({ status: false, msg: "invalid url" })
})

module.exports = router;