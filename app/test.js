const chalk = require("chalk");
const exec = require('child_process').exec;

exec('nmcli -t g | grep full', (error) => {
    'use strict';
    if (error) {
        console.log(chalk.red(`exec error: ${error}`));
        return;
    }
});