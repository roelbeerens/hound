const resin = require('resin-sdk');
const chalk = require("chalk");

module.exports = {
    shutdown: function () {
        resin.models.device.shutdown(process.env.RESIN_APP_ID, function (error) {
            if (error) {
                console.log(chalk.red(error));
            }
        });
    }
};