import express from 'express';
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { createServer } from 'http'
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator";
import UserModel from "./models/user.js"
import { loginValidation, postCreateValidation, registerValidation } from './validation/auth.js'
import checkAuth from './utils/checkAuth.js'
import * as UserControll from './controller/UserControll.js'
import * as PostControll from './controller/PostControll.js'
import * as CommentControll from './controller/CommentControll.js'
import * as NewsControll from './controller/NewsControll.js'
import nodemailer from 'nodemailer';
import multer from 'multer'

//mongodb+srv://vladmorozov2020:Nevskifront208@moroz.gjylj0v.mongodb.net/blog?retryWrites=true&w=majority&appName=Moroz

mongoose
    .connect('mongodb+srv://vladmorozov2020:Nevskifront208@moroz.gjylj0v.mongodb.net/blog?retryWrites=true&w=majority&appName=Moroz')
    .then(() =>{console.log("DB OK")})
    .catch((err) => {console.log('DB ERR', err)})

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({storage})

app.use(express.json());
 
app.use('/uploads', express.static('uploads'))

app.get('/auth/me' ,checkAuth, UserControll.getMe);
app.get('/auth/users' ,checkAuth, UserControll.getUsers);
app.post('/auth/login',loginValidation, UserControll.login)
app.post('/auth/register', registerValidation, UserControll.register);

app.post('/upload',checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})
app.get('/image/:filename', (req, res) => {
    const { filename } = req.params;
    res.sendFile(path.join(__dirname, 'uploads', filename));
});

app.get('/posts', PostControll.getAll);
app.get('/posts/:id', PostControll.getOne);
app.post('/posts',checkAuth ,postCreateValidation, PostControll.create);
app.delete('/posts/:id',checkAuth , PostControll.remove);
app.put('/posts/:id',checkAuth ,  PostControll.update);
app.post('/posts/tag', PostControll.getPosts);

app.get('/news', NewsControll.getAll);
app.get('/news/:id', NewsControll.getOne);
app.post('/news',checkAuth ,postCreateValidation, NewsControll.create);
app.delete('/news/:id',checkAuth , NewsControll.remove);
app.put('/news/:id',checkAuth ,  NewsControll.update);

app.put('/like_plus/:id',checkAuth ,  PostControll.like_plus);
app.put('/like_minus/:id',checkAuth ,  PostControll.like_minus);


app.post('/comment',checkAuth , CommentControll.create);
app.get('/comment/:post_id', CommentControll.getComments);
app.delete('/comment/:post_id', CommentControll.remove);

app.post('/comment_ans',checkAuth , CommentControll.create_ans_com);
app.get('/comment_ans/:post_id', CommentControll.getCommentsAns);

const PORT = 3030;

app.listen(PORT, (err) => {
    if(err){
   return console.log(err);
  }

  console.log('Server Ok')
})

