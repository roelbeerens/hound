const express = require('express')
const router = express.Router()
const mpv = require('node-mpv')
const player = new mpv({
  'audio_only': true,
  'verbose': false,
  'debug': false,
}, [
  '--volume=20',
  '--no-config',
  '--load-scripts=no',
])

router.post('/player/play', function (req, res) {
  let url = req.body.url
  if (url) {
    player.stop()
    player.load(url)

    res.send([{'message': 'Player started', 'status': 'playing'}])
  }
})

router.post('/player/stop', function (req, res) {
  player.stop()

  res.send([{'message': 'Player stopped', 'status': 'stopped'}])
})

router.post('/player/volume/set', function (req, res) {
  let level = req.body.volume
  if (level) {
    player.volume(level)

    res.send([{'message': 'Volume set to: ' + level, 'level': level}])
  }
})

router.post('/player/mute', function (req, res) {
  player.toggleMute()

  res.send([{'message': 'Mute toggeled', 'status': 'mute'}])
})

router.get('/player/status', function (req, res) {
  res.send(player.observed)
})

module.exports = {
  router,
  player
}