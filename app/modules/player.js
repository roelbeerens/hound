const OMXPlayer = require('omxplayer');
const omxplayer = new OMXPlayer();
const chalk = require("chalk");

module.exports = {
    play: function (url) {
        omxplayer.stop();
        omxplayer.start(url, {'volume': -602}, function (error) {
            if (error) {
                console.log(chalk.red(`exec error: ${error}`));
                return;
            }
        });
    },
    stop: function () {
        omxplayer.stop();
    }
};