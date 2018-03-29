const spawn = require('child_process').spawn;
const chalk = require("chalk");

module.exports = {
    run: function() {
        console.log(chalk.cyan('Starting Shairport'));

        const shairport = spawn('shairport-sync');

        shairport.stdout.on('data', (data) => {
            'use strict';
            console.log(chalk.cyan(`Shairport: ${data}`));
        });

        shairport.stderr.on('data', (data) => {
            'use strict';
            console.log(chalk.red(`Shairport: ${data}`));
        });

        shairport.on('close', (code) => {
            'use strict';
            console.log(chalk.yellow(`Shairport process exited with code ${code}`));
        });
    }
};