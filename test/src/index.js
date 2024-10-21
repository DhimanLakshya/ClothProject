const express = require('express');
const mongoose=require('mongoose');

//grnerating test api
const app = express()
app.use(express.json())

const port = 8080;
mongoose.connect('mongodb+srv://ldhiman450:LsStTFJKHDKUbNeP@cluster0.zhq9d.mongodb.net/testDB')
.then(()=>{console.log('mongo');})

app.post('/testapi', (req, res) => {
    try{
        return res.send('dsjfhdksfhkjds')
    }
    catch(e){ return res.send(e.message)}
})

app.listen(port, () => { console.log('Server is running at port', port)})