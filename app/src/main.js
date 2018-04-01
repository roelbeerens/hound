const path = require('path');
const shairport = require(path.join(__dirname + '/modules/shairport-sync'));
const raspotify = require(path.join(__dirname + '/modules/raspotify'));
const app = require(path.join(__dirname + '/modules/app'));

//Shairport
shairport.init();

//Raspotify
raspotify.init();

//App
app.init();