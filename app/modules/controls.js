const resin = require('resin-sdk');
const chalk = require("chalk");

module.exports = {
    shutdown: function () {
        if (resin.models) {
            resin.models.device.shutdown(process.env.RESIN_DEVICE_UUID, function (error) {
                if (error) {
                    console.log(chalk.red(error));
                }
            });
        }
    },
    reboot: function () {
        if (resin.models) {
            resin.models.device.reboot(process.env.RESIN_DEVICE_UUID, function (error) {
                if (error) {
                    console.log(chalk.red(error));
                }
            });
        }
    }
};