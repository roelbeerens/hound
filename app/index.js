const path = require('path');
const express = require('express');
const app = express();
const chalk = require("chalk");
const spawn = require('child_process').spawn;
// const shairport = require(path.join(__dirname + '/modules/shairport-sync'));
// const raspotify = require(path.join(__dirname + '/modules/raspotify'));

//Shairport
// shairport.run();

console.log(chalk.cyan('Starting Shairport'));

const shairport = spawn('shairport-sync');

shairport.stdout.on('data', (data) => {
    'use strict';
    console.log(chalk.cyan(`Shairport: ${data}`));
});

shairport.stderr.on('data', (data) => {
    'use strict';
    console.log(chalk.red(`Shairport: ${data}`));
});

shairport.on('close', (code) => {
    'use strict';
    console.log(chalk.yellow(`Shairport process exited with code ${code}`));
});

//Raspotify
// raspotify.run();
console.log(chalk.cyan('Starting Raspotify'));

const raspotify = spawn('raspotify');

raspotify.stdout.on('data', (data) => {
    'use strict';
    console.log(chalk.cyan(`Raspotify: ${data}`));
});

raspotify.stderr.on('data', (data) => {
    'use strict';
    console.log(chalk.red(`Raspotify: ${data}`));
});

raspotify.on('close', (code) => {
    'use strict';
    console.log(chalk.yellow(`Raspotify process exited with code ${code}`));
});

//Server
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/ui/index.html'));
});

//start a server on port 80 and log its start to our console
let server = app.listen(80, function () {
    let port = server.address().port;
    console.log(chalk.cyan('Example app listening on port ', port));
});