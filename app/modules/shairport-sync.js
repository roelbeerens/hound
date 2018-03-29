const exec = require('child_process').exec;
const chalk = require("chalk");

module.exports = {
    run: function() {
        console.log(chalk.cyan('Starting Shairport'));
        exec('shairport-sync', (error) => {
            if (error) {
                console.log(chalk.red(`exec error: ${error}`));
                return;
            }
        });
    }
};