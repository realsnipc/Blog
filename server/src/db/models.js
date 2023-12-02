const mongoose= require('mongoose')


// Models 
const userSchema= new mongoose.Schema({
    usernname: String,
    password: String
})

const userdata= new mongoose.model('Data',userSchema)


module.exports= userdata


