//test
const bodyParser = require('body-parser');
const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());
app.use(require('./src/controller/userController'));


app.get('/', function (req, res) {
    res.send('Server is up!');
});

const port = 5000;
app.listen(port, function () {
    console.log(`app listening on port ${port} `);
});
//test
