import UserModel from "../models/user.js"
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';



export const register = async (req, res) => {
    try{
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json(errors.array());
     }
  
     const doc = new UserModel({
         email: req.body.email,
         fullname: req.body.fullname,
         password: req.body.password,
     });
     if(!req.body.email || !req.body.password){
        return send.status(400)
     }
     else{
        const userEmail = req.body.email
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'moroz314vl@gmail.com',
                pass: 'jhzq svue asns ntax'
            }
        });

    // async..await is not allowed in global scope, must use a wrapper
    let mailOptions = {
        from: 'moroz314vl@gmail.com',
        to: `${userEmail}`,
        subject: 'Подтверждение почты',
        text: 'что бы подтвердить нажни на кнопку',
        html: "<button>Кнопка</button>"
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({
                message: 'сообщение на почту отправлено',
            });
        }

});
     }
     const user = await doc.save();
     
     
     const token = jwt.sign(
         {
             _id: user._id,
         },
         'secret123',
         {
             expiresIn: '30d',
         }
         );
 
     res.json({
         ...user._doc,
         token
     })
    }
    catch (err){
         res.status(500).json({
             message: 'неудалось зарегистрироваться',
         });
         console.log(err)
    }
};

export const login = async (req, res) => {
    try{
        const user = await UserModel.findOne({email: req.body.email});

        if(!user){
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }


        if(req.body.password !=  user._doc.password){
            return res.status(400).json({
                message: 'Неверный логин или пароль'
            })
        }
        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            }
            );

            res.json({
                ...user._doc,
                token
            })
    }
    catch(err){
        res.status(500).json({
            message: 'неудалось авторизаваться',
        });
    }
};

export const getMe = async (req, res) => {
    try{
        const user = await UserModel.findById(req._id)

        if (!user){
            return res.status(404).json({
                message: "Пользователь не найден"
            });
        }
        

        const {...userData} = user._doc;

        res.json(userData)
    } 
    catch(err){
        console.log(err)
        return res.status(500).json({
            message: "нет доступа"
        });
    }
};
