const mongoose = require('mongoose')
require('dotenv').config();


// const mongourl = process.env.LOCAL_MONGO_URL 

const mongourl = process.env.MONGODB_URL 

mongoose.connect(mongourl)

const db = mongoose.connection;

db.on('connected' ,()=>{
    console.log("Mongodb Connected");
})

db.on('error' , (err)=>{
    console.log("Error "+ err)
})

db.on('disconnected' , ()=>{
    console.log("Mongodb disconnected")
})


module.exports = db;