const path = require('path');
const shairport = require(path.join(__dirname + '/modules/shairport-sync'));
const raspotify = require(path.join(__dirname + '/modules/raspotify'));
const ui = require(path.join(__dirname + '/modules/ui'));
const feedback = require(path.join(__dirname + '/modules/feedback'));
const socket = require(path.join(__dirname + '/modules/socket'));

//Shairport
shairport.run();

//Raspotify
raspotify.run();

//Ui
ui.run();

//Give feedback
feedback.startup();

//Socket
socket.listen();