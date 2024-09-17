const express = require("express");
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const port = 8080;
const app = express();
const router = express.Router();


app.get('/', (req,res) =>{
    res.send("HOLLOW WORLD");
})

app.listen(port,() =>{
    console.log("started listening");
})
