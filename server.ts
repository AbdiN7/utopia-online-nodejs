//test
import express = require('express');

const app: express.Application = express();

app.get('/', function (req, res)
{
    res.send('Hello World!');
});

const port: string = "5000";

app.listen(5000, function () {
    console.log(`Example app listening on port ${port}`);
});
//test
