import { body } from "express-validator";


export const registerValidation = [
    body('email', 'неверный формат почты').isEmail(),
    body('password', 'неверный формат пороля').isLength({min: 5}),
    body('fullname', 'неверный формат имени').isLength({min: 3}),
];

export const loginValidation = [
    body('email', 'неверный формат почты').isEmail(),
    body('password', 'неверный формат пороля').isLength({min: 5})
];


export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({min: 3}).isString(),
    body('text', 'Введите текс статьи').isLength({min: 10}).isString(),
    body('tags', 'неверный формат тегов').optional().isString(),
    body('imgeUrl', 'неверная ссылка на изображение').optional().isString(),
];