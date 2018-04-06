const express = require('express')
const router = express.Router()
const axios = require('axios')
const chalk = require('chalk')

router.post('/supervisor/reboot', function () {
  axios.post(process.env.RESIN_SUPERVISOR_ADDRESS + '/v1/restart?apikey=' + process.env.RESIN_SUPERVISOR_API_KEY, {
    appId: process.env.RESIN_APP_ID
  }).then(function (response) {
    if (response.Data === 'OK') {
      console.log(chalk.magenta('Rebooting ' + process.env.RESIN_APP_NAME));
    }
  }).catch(function (error) {
    console.log(chalk.red(error));
  });
})

module.exports = router