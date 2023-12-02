require('dotenv').config();


const mongoose= require("mongoose")
const pass= process.env.DB_PASS
const user= process.env.DB_USER

// MongoDB connection string
db_url= `mongodb+srv://${user}:${pass}@snisays.qhiswo7.mongodb.net/Data`






mongoose.connect(db_url).then(()=>{
    console.log("Connection to MongoDB successful.")
}).catch((err)=>{
    console.log(err)
    console.error("Connection to MongoDB failed!")
})