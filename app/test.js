const socket = require('socket.io-client')('http://127.0.0.1:5555');
const chalk = require("chalk");

socket.on('connect', function(){
    console.log(chalk.yellow('Connect'));
});

socket.on('event', function(data){
    console.log(chalk.blue(data));
});

socket.on('disconnect', function(){
    console.log(chalk.red('Disconnect'));
});