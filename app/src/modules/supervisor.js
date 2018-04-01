const axios = require('axios');
const chalk = require('chalk');

module.exports = {
    shutdown: function () {
        axios.post(process.env.RESIN_SUPERVISOR_ADDRESS + '/v1/shutdown?apikey=' + process.env.RESIN_SUPERVISOR_API_KEY)
            .then(function (response) {
                if (response.Data === 'OK') {
                    console.log(chalk.magenta('Shutting down', process.env.RESIN_APP_NAME));
                }
            })
            .catch(function (error) {
                console.log(chalk.red(error));
            });
    },
    reboot: function () {
        axios.post(process.env.RESIN_SUPERVISOR_ADDRESS + '/v1/reboot?apikey=' + process.env.RESIN_SUPERVISOR_API_KEY)
            .then(function (response) {
                if (response.Data === 'OK') {
                    console.log(chalk.magenta('Rebooting ' + process.env.RESIN_APP_NAME));
                }
            })
            .catch(function (error) {
                console.log(chalk.red(error));
            });
    }
};