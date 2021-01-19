const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const passportJWT = require('../middlewares/passportJWT');

//localhost:3000/api/user/register
// router.post('/register',
//     [
//         body('name').not().isEmpty().withMessage('กรุณาป้อนข้อมูลชื่อสกุล'),

//         body('email').not().isEmpty().withMessage('กรุณาป้อนข้อมูลอีเมล์')
//             .isEmail().withMessage('รูปแบบอีเมล์ไม่ถูกต้อง'),

//         body('password').not().isEmpty().withMessage('กรุณาป้อนรหัสผ่าน')
//             .isLength({ min: 3 }).withMessage('ป้อนรหัสผ่านอย่างน้อย 3 ตัวอักษร'),
//     ]
//     , userController.register);

//localhost:3000/api/user/login
router.post('/login', userController.login);

//get profile
//localhost:3000/api/user/me
// router.get('/me', passportJWT.isLogin, userController.me);

module.exports = router;