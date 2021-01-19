var url = require('url');
const fs = require("fs");
var multer = require('multer');
const db = require("../model");
const Item = db.item;

// variables
// const dataPath = './data/itemList.json';

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

// READ
exports.getItems = async (req, res, next) => {
    try {
        let dataList = [];
        await Item.find()
            .then(data => {
                dataList = data;
            })
            .catch(err => {
                console.log(err);
            });
        const queryObject = url.parse(req.url, true).query;
        if (0 === Object.entries(queryObject).length) {
            res.send(dataList);
        } else if (undefined !== queryObject.fabric_type) {
            let fabric_type = 0;
            if ('1' === queryObject["fabric_type"]) {
                fabric_type = 1;
            } else if ('2' === queryObject["fabric_type"]) {
                fabric_type = 2;
            } else if ('3' === queryObject["fabric_type"]) {
                fabric_type = 3;
            }
            const fabricFilRes = dataList.filter(data => data.fabric_type == fabric_type);
            res.send(fabricFilRes);
        } else if (undefined !== queryObject.group) {
            let group = dataList.reduce((r, a) => {
                r[a[`${queryObject.group}`]] = [...r[a[`${queryObject.group}`]] || [], a];
                return r;
            }, {});
            res.send(group);
        } else {
            console.log("Fail");
        }
        // readFile((data) => {
        //     const queryObject = url.parse(req.url, true).query;
        //     if (0 === Object.entries(queryObject).length) {
        //         res.send(data);
        //     } else if (undefined !== queryObject.fabric_type) {
        //         let fabric_type = 0;
        //         if ('1' === queryObject["fabric_type"]) {
        //             fabric_type = 1;
        //         } else if ('2' === queryObject["fabric_type"]) {
        //             fabric_type = 2;
        //         } else if ('3' === queryObject["fabric_type"]) {
        //             fabric_type = 3;
        //         }
        //         const fabricFilRes = data.filter(data => data.fabric_type == fabric_type);
        //         res.send(fabricFilRes);
        //     } else if (undefined !== queryObject.group) {
        //         let group = data.reduce((r, a) => {
        //             r[a[`${queryObject.group}`]] = [...r[a[`${queryObject.group}`]] || [], a];
        //             return r;
        //         }, {});
        //         res.send(group);
        //     } else {
        //         console.log("Fail");
        //     }
        // }, true);
    } catch (error) {
        next(error);
    }
};

exports.uploadItems = (req, res, next) => {
    try {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'D:/React/23aloha/front-end/public/images')
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);
            }
        })
        var upload = multer({ storage: storage }).single('file')

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }

            const body = {
                img_name: req.body.img_name,
                file_name: req.file.filename,
                fabric_type: req.body.fabric_type
            }
            createItem(body)
            return res.status(200).send(req.file)

        })
    } catch (error) {
        next(error);
    }

}

// CREATE
const createItem = (dataBody) => {
    // Create a Item
    const item = new Item({
        img_name: dataBody.img_name,
        file_name: dataBody.file_name,
        fabric_type: dataBody.fabric_type
    });
    // Save Item in the database
    item.save(item)
        .then((item) => {
        })
        .catch((err) => {
            console.log(err);
        })
}


// UPDATE
exports.updateItem = (req, res, next) => {
    try {
        //check image before save
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'D:/React/23aloha/front-end/public/images')
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);
            }
        })
        var upload = multer({ storage: storage }).single('file')

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            if (undefined != req.file['filename'] && req.body.file_name != req.file.filename) {
                let path = "D:/React/23aloha/front-end/public/images/" + req.body.file_name;
                fs.unlinkSync(path);
                req.body.file_name = req.file.filename;
            }
            Item.findByIdAndUpdate(req.params['id'], req.body, { new: true })
                .then((item) => {
                })
                .catch((err) => {
                    console.log(err);
                })
            return res.status(200).send(req.file)

        })
    } catch (error) {
        next(error);
    }
};


    // DELETE
    // app.delete('/users/:id', (req, res) => {

    //     readFile(data => {

    //         // add the new user
    //         const userId = req.params["id"];
    //         delete data[userId];

    //         writeFile(JSON.stringify(data, null, 2), () => {
    //             res.status(200).send(`users id:${userId} removed`);
    //         });
    //     },
    //         true);
    // });