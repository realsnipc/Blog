const express = require('express');
const app = express();
const cors = require('cors');
const user = require('./db/models');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userdata = require('./db/models');
const multer = require('multer');
const upload = multer({ dest: 'src/uploads/' });
const fs = require('fs');
const path = require('path');
const postModel = require('./db/postmodel');
const { default: mongoose } = require('mongoose');
require("./db/connection"); // Connection to MongoDB



const port = process.env.PORT || 7777; // Port (Locally, defaults to 7777)
const origin = process.env.CLIENT_URL || 'http://localhost:5173'; // Client URL (Locally, defaults to localhost)
app.use(cors({ credentials: true, origin: origin }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + '/uploads'))
const secret = 'mynameislakhanfourtwokakonwhowsisyourmom';


// match user password to database 
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userdoc = await user.findOne({ username });
        if (!userdoc) {
            res.status(404).json("notExist");
        } else if (password != userdoc.password) {
            res.status(404).json("wrongPassword");
        } else if (password == userdoc.password) {
            // logged in

            jwt.sign({ username, id: userdoc._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    id: userdoc._id,
                    username
                });

            });
            // res.status(200).json("Hogya");
        }


    } catch (error) {
        res.status(404).json("User registration Failed");


    }



});

app.post('/post', upload.single('file'), async (req, res) => {
    try {
        const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    const splitPath= newPath.split('src')
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {},async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDoc = await new postModel({
            title,
            summary,
            content,
            cover: splitPath[1],
            author: info.id
        });
        postDoc.save();
        res.json(postDoc)
    });
        
    } catch (error) {
        res.json("Error Occured")
        
    }
    
});

app.get('/post', async (req, res) => {
    const posts = await postModel.find().populate('author',['username']).sort({createdAt:-1});
    res.json(posts);
});


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

app.get('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

app.get('/post/:id', async (req, res)=>{
    const {id} = req.params
    const postRes= await postModel.findById(id).populate('author',['username']);
    res.json(postRes)
})




app.listen(port, () => {
    console.log("App listening on http://localhost:" + port);
});