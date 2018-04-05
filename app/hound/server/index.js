const express = require('express')
const chalk = require('chalk')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const api = require('./api')

app.set('port', port)

// Import API Routes
app.use('/api', api)

// Import usage
app.use(express.static('dist'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.route('/').get(function (req, res) {
  res.sendFile('../dist/index.html')
})

app.listen(port, host, function () {
  console.log(chalk.cyan('Started UI on ' + host + ':' + port))
})