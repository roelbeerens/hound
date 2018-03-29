{
    const chalk = require("chalk");
    const shairport = require('modules/shairport-sync');
    const raspotify = require('modules/raspotify');
    const supervisor = require('lib/supervisor/index');

    //Shairport
    shairport.run();

    //Raspotify
    raspotify.run();

    // Supervisor
    supervisor.start(500, () => {
        'use strict';
        supervisor.on('status', (status) => {
            console.log(chalk.white('Supervisor status update: ' + status));
            switch (status) {
                case "Idle":
                    break;
                case "Installing":
                    break;
                case "Downloading":
                    break;
                case "Starting":
                    break;
                case "Stopping":
                    setTimeout(() => {
                        process.exit(1);
                    }, 1000);
                    break;
            }
        });
    });
}