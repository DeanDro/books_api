'use strict';

const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res)=>{
    res.status(200).send("Hello World!");
}); 


app.listen(3000, ()=>console.log("Running at port 3000"));