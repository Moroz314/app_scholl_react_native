import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator";
import UserModel from "./models/user.js"
import { registerValidation } from './validation/auth.js'
import checkAuth from './utils/checkAuth.js'
import * as UserControll from './controller/UserControll.js'
import nodemailer from 'nodemailer';

mongoose
    .connect('mongodb+srv://vladmorozov2020:Nevskifront208@moroz.gjylj0v.mongodb.net/blog?retryWrites=true&w=majority&appName=Moroz')
    .then(() =>{console.log("DB OK")})
    .catch((err) => {console.log('DB ERR', err)})

const app = express();


app.use(express.json());

app.get('/auth/me' , UserControll.getMe);

app.post('/auth/login', UserControll.login)



app.post('/auth/register', registerValidation, UserControll.register);
const PORT = 3000;

app.listen(PORT, (err) => {
    if(err){
       return console.log(err);
    }

    console.log('server start');
});