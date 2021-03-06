//test
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const cors = require('cors');
const CONFIG = require('./config');

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());
// app.use(require('./src/controller/userController'));
app.get('/', function (req, res) {
    res.send('Server is up!');
});
const Users = require('./src/routes/Users');
app.use('/users', Users);

app.listen(`${CONFIG.port}`, function () {
    console.log(`app listening on port ${CONFIG.port} `);
});

module.exports = app;
//test
