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
  res.setHeader('Access-Control-Allow-Origin', '*');

  let url = req.body.url

  player.stop()
  player.load(url);

  res.send([{'message': 'Player started'}])
})

router.post('/player/stop', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  player.stop()

  res.send([{'message': 'Player stopped'}])
})

router.post('/player/volume/set', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  let level = req.body.volume

  player.volume(level)

  res.send([{'message': 'Volume set to: ' + level}])
})

router.post('/player/mute', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  player.toggleMute();

  res.send([{'message': 'Mute toggeled'}])
})

router.post('/player/status', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.send(player.observed)
})

module.exports = router