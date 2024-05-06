import { body } from "express-validator";


export const registerValidation = [
    body('email', 'неверный формат почты').isEmail(),
    body('password', 'неверный формат пороля').isLength({min: 5}),
    body('fullname', 'неверный формат имени').isLength({min: 3}),
];