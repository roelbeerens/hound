const path = require('path');
const express = require('express');
const app = express();
const chalk = require("chalk");
const shairport = require(path.join(__dirname + '/modules/shairport-sync'));
const raspotify = require(path.join(__dirname + '/modules/raspotify'));

//Shairport
shairport.run();

//Raspotify
raspotify.run();

//Server
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/ui/index.html'));
});

//start a server on port 80 and log its start to our console
let server = app.listen(80, function () {
    let port = server.address().port;
    console.log(chalk.cyan('Example app listening on port ', port));
});