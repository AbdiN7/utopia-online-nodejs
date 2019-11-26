"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//test
var express = require("express");
var app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
var port = "5000";
app.listen(5000, function () {
    console.log("Example app listening on port " + port);
});
//test
