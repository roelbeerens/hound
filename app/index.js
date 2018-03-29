{
    const spawn = require('child_process').spawn;
    const chalk = require("chalk");
    const supervisor = require(__dirname + '/libs/supervisor/index.js');

    // Shairport
    console.log(chalk.cyan('Starting Shairport'));

    const shairport = spawn('shairport-sync');

    shairport.stdout.on('data', (data) => {
        'use strict';
        console.log(`shairport: ${data}`);
    });

    shairport.stderr.on('data', (data) => {
        'use strict';
        console.log(`shairport: ${data}`);
    });

    shairport.on('close', (code) => {
        'use strict';
        console.log(`shairport process exited with code ${code}`);
    });

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