const exec = require('child_process').exec;
const chalk = require('chalk');

exec('systemctl start raspotify', (error) => {
  if (error) {
    console.log(chalk.red(`exec error: ${error}`));
    return;
  } else {
    console.log(chalk.cyan('Raspotify started'));
  }
});