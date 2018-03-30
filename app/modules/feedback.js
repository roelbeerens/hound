// const path = require('path');
// const player = require('play-sound')(opts = {
//     player: 'aplay'
// });
const chalk = require("chalk");

module.exports = {
    startup: function () {
        console.log(chalk.yellow('Device is ready!'));
        //player.play(path.join(__dirname + '/assets/audio/startup.mp3'));
    },
    shutdown: function () {
        console.log(chalk.red('Device is shutting down!'));
    },
};