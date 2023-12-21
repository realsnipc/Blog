const mongoose = require('mongoose');


const postSchema= new mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    author: {type:mongoose.Schema.Types.ObjectId, ref:'Data'}
},{
    timestamps: true
    
})
const postModel = mongoose.model('Post', postSchema);

module.exports= postModel;