const exec = require('child_process').exec
const chalk = require('chalk')

console.log(chalk.cyan('Starting Raspotify'))
exec('systemctl start raspotify', (error) => {
  if (error) {
    console.log(chalk.red(`exec error: ${error}`))
    return
  }
});