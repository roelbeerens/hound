const resin = require('resin-sdk');
const chalk = require("chalk");

module.exports = {
    shutdown: function () {
        resin.models.device.shutdown(process.env.RESIN_DEVICE_UUID, function (error) {
            if (error) {
                console.log(chalk.red(error));
            }
        });
    }
};