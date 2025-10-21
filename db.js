const mongoose = require('mongoose')
const mongourl = 'mongodb://localhost:27017/hotel'

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