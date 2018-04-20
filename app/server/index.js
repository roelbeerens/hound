const express = require('express')
const chalk = require('chalk')
const app = express()
const port = process.env.PORT || 3000
const api = require('./api')
const player = require('./api/player')

// Set port
app.set('port', port)

// Config
app.use(express.static('dist'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// Set headers
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  res.append('Access-Control-Allow-Methods', ['GET,HEAD,OPTIONS,POST,PUT'])
  res.append('Access-Control-Allow-Headers', ['Origin, X-Requested-With, Content-Type, Accept'])
  next()
})

// Import API Routes
app.use('/api', api)

app.route('/').get(function (req, res) {
  res.sendFile('../dist/index.html')
})

app.listen(port, function () {
  console.log(chalk.cyan('Started UI on port: ' + port))
  player.player.load(__dirname + '/../assets/audio/start.wav')
  console.log(chalk.yellow('System online'))
})