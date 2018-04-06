const exec = require('child_process').exec
const chalk = require('chalk')

exec('shairport-sync', (error) => {
  if (error) {
    console.log(chalk.red(`exec error: ${error}`));
    return;
  } else {
    console.log(chalk.cyan('Shairport started'));
  }
});