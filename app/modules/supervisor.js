const request = require('request');
const chalk = require("chalk");

module.exports = {
    shutdown: function () {
        request.post(process.env.RESIN_SUPERVISOR_ADDRESS + '/v1/shutdown?apikey=' + process.env.RESIN_SUPERVISOR_API_KEY, function (error, response) {
            if (error) {
                console.log(chalk.red(error));
            } else if (response.Data === 'OK') {
                console.log(chalk.magenta('Shutting down', process.env.RESIN_APP_NAME));
            }
        });
    },
    reboot: function () {
        request.post(process.env.RESIN_SUPERVISOR_ADDRESS + '/v1/reboot?apikey=' + process.env.RESIN_SUPERVISOR_API_KEY, function (error, response) {
            if (error) {
                console.log(chalk.red(error));
            } else if (response.Data === 'OK') {
                console.log(chalk.magenta('Rebooting', process.env.RESIN_APP_NAME));
            }
        });
    }
};