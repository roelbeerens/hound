const express = require('express');
const app = express();
const chalk = require("chalk");
const shairport = require(__dirname + '/modules/shairport-sync');
const raspotify = require(__dirname + '/modules/raspotify');

//Shairport
shairport.run();

//Raspotify
raspotify.run();

//Server
// reply to request with "Hello World!"
app.get('/', function (req, res) {
    res.send('Hello World!');
});

//start a server on port 80 and log its start to our console
let server = app.listen(80, function () {
    let port = server.address().port;
    console.log(chalk.cyan('Example app listening on port ', port));
});