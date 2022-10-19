const express = require('express');
const app = express();
var cors = require('cors')
const PORT = process.env.PORT;
const dotenv = require('dotenv').config()
app.use(express.json());
app.use(cors())


require('./services/db.service');
app.use('/', require('./routes'));
app.use(require('./documentation/index'))

app.listen((process.env.PORT),(err)=>{
    if(err){
        throw err
    }else{
        console.log(`your app is running on PORT : ${process.env.PORT}`);
        console.log(`api url: http://localhost:${process.env.PORT}`)
        console.log(`docs: http://localhost:${process.env.PORT}/docs`)
    }
})

