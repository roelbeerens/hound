const spawn = require('child_process').spawn;
const chalk = require("chalk");

module.exports = {
    run: function() {
        console.log(chalk.cyan('Starting Raspotify'));

        const raspotify = spawn('raspotify');

        raspotify.stdout.on('data', (data) => {
            'use strict';
            console.log(chalk.cyan(`Raspotify: ${data}`));
        });

        raspotify.stderr.on('data', (data) => {
            'use strict';
            console.log(chalk.red(`Raspotify: ${data}`));
        });

        raspotify.on('close', (code) => {
            'use strict';
            console.log(chalk.yellow(`Raspotify process exited with code ${code}`));
        });
    }
};