const path = require('path');
const shairport = require(path.join(__dirname + '/modules/shairport-sync'));
const raspotify = require(path.join(__dirname + '/modules/raspotify'));
const ui = require(path.join(__dirname + '/modules/ui'));
const player = require('play-sound')(opts = {});

//Shairport
shairport.run();

//Raspotify
raspotify.run();

//Ui
ui.run();

//When all is running
player.play(path.join(__dirname + '/assets/audio/woof.mp3'));