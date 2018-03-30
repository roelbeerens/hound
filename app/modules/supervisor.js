const request = require('request');
const chalk = require("chalk");

module.exports = {
    shutdown: function () {
        request(process.env.RESIN_SUPERVISOR_ADDRESS + '/v1/shutdown?apikey=' + process.env.RESIN_SUPERVISOR_API_KEY, function(error) {
            if (error) {
                console.log(chalk.red(error));
            } else {
                console.log(chalk.magenta('Shutting down!'));
            }
        });
    },
    reboot: function () {
        request(process.env.RESIN_SUPERVISOR_ADDRESS + '/v1/reboot?apikey=' + process.env.RESIN_SUPERVISOR_API_KEY, function(error) {
            if (error) {
                console.log(chalk.red(error));
            } else {
                console.log(chalk.magenta('Rebooting!'));
            }
        });
    }
};