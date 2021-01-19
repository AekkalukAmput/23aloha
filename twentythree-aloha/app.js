// load up the express framework and body-parser helper
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
// import errorHander middleware
const passportJWT = require('./middlewares/passportJWT');
const errorHander = require('./middlewares/errorHandler');
const db = require("./model");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });
// create an instance of express to serve our end points
const app = express();

// import route
const itemRouter = require('./routes/items');
const userRouter = require('./routes/user');

app.use(cors())
app.use(helmet())
// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// configure our express instance with some body-parser settings
// including handling JSON data
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//use and init passport
app.use(passport.initialize());

app.use('/api/items', itemRouter);
app.use('/api/user', userRouter);

//copy โฟลเดอร์ build จาก react และเขียนโค้ดดังนี้ (ให้สามารถใช้ backend กับ frontend ในเครื่องเดียวกันได้)
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// finally, launch our server on port 3001.
// const server = app.listen(3001, () => {
//     console.log("listening on port %s...", server.address().port);
// });
app.use(errorHander);
module.exports = app;