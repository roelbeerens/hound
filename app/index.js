const path = require('path');
const shairport = require(path.join(__dirname + '/modules/shairport-sync'));
const raspotify = require(path.join(__dirname + '/modules/raspotify'));
const ui = require(path.join(__dirname + '/modules/ui'));

//Shairport
shairport.run();

//Raspotify
raspotify.run();

//Ui
ui.run();