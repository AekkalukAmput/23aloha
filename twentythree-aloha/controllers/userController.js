// const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
// const fs = require("fs");
const MessageService = require('../services/messageService');
const db = require("../model");
const User = db.user;

exports.findAll = async (req, res) => {
    let dataList = [];
    await User.find()
        .then(data => {
            dataList = data;
        })
        .catch(err => {
            console.error(err);
        });
    return dataList;
};

// variables
// const dataPath = './data/userList.json';

// helper methods
// const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
//     fs.readFile(filePath, encoding, (err, data) => {
//         if (err) {
//             throw err;
//         }

//         callback(returnJson ? JSON.parse(data) : data);
//     });
// };

// const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

//     fs.writeFile(filePath, fileData, encoding, (err) => {
//         if (err) {
//             throw err;
//         }

//         callback();
//     });
// };

// exports.register = async (req, res, next) => {
//     try {

//         const { name, email, password } = req.body;

//         const errorValidation = validationResult(req);
//         if (!errorValidation.isEmpty()) {
//             const error = new Error('เกิดข้อผิดพลาดจากข้อมูลที่ส่งมา');
//             error.statusCode = 422;
//             error.validation = errorValidation.array()
//             throw error;
//         }

//         //check email ซ้ำ
//         const existEmail = await User.findOne({ email: email });
//         if (existEmail) {
//             const error = new Error('อีเมล์นี้มีผู้ใช้งานแล้ว');
//             error.statusCode = 403;
//             throw error;
//         }

//         let user = new User();
//         user.name = name;
//         user.email = email;
//         user.password = await user.encryptPassword(password);
//         await user.save();

//         return res.json(201, {
//             message: 'ลงทะเบียนเรียบร้อย'
//         })


//     } catch (error) {
//         next(error);
//     }
// }

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        let userList = await this.findAll();
        //รับ username, password จาก req.body (destructuring)
        //นำ username ไปตรวจสอบว่ามีในระบบหรือไม่ ถ้าไม่มีให้โยน 401 บอกว่า ไม่พบผู้ใช้ในระบบ
        let user = false;
        let token;
        let expires_in = { exp: "" };
        for (var i = 0; i < userList.length; i++) {
            if ((username == userList[i].username) && (password == userList[i].password)) {
                user = true;
                token = genToken(userList).token;
                expires_in = genToken(userList).expires_in;
                message = MessageService.message(MessageService.CODE_MESSAGE.S01)
                break;
            }
        }
        if (!user) {
            message = MessageService.message(MessageService.CODE_MESSAGE.W01)
        }

        //ส่ง token ไปให้ผู้ใช้
        return res.json({
            access_token: token,
            expires_in: expires_in.exp,
            token_type: 'Bearer',
            message: message
        });
        // readFile((data) => {
        //     userList = data;
        //     //รับ username, password จาก req.body (destructuring)
        //     //นำ username ไปตรวจสอบว่ามีในระบบหรือไม่ ถ้าไม่มีให้โยน 401 บอกว่า ไม่พบผู้ใช้ในระบบ
        //     let user = false;
        //     let token;
        //     let expires_in = { exp: "" };
        //     for (var i = 0; i < userList.length; i++) {
        //         if ((username == userList[i].username) && (password == userList[i].password)) {
        //             user = true;
        //             token = genToken(userList).token;
        //             expires_in = genToken(userList).expires_in;
        //             message = MessageService.message(MessageService.CODE_MESSAGE.S01)
        //             break;
        //         }
        //     }
        //     if (!user) {
        //         message = MessageService.message(MessageService.CODE_MESSAGE.W01)
        //     }

        //     //ส่ง token ไปให้ผู้ใช้
        //     return res.json({
        //         access_token: token,
        //         expires_in: expires_in.exp,
        //         token_type: 'Bearer',
        //         message: message
        //     });

        // }, true);

    } catch (error) {
        next(error)
    }

}

const genToken = (user) => {
    //สร้าง token
    const token = jwt.sign({ id: user.id, role: user.role },
        config.JWT_SECRET, { expiresIn: '1 days' });

    //decode วันหมดอายุ
    const expires_in = jwt.decode(token);
    return { token, expires_in };
}

exports.me = async (req, res, next) => {
    return res.json({
        user: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        }
    });
}