const express = require('express')
const router = express.Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('/data/hound.json')
const db = low(adapter)
const exec = require('child_process').exec

router.post('/settings/profile/set', function (req, res) {
  let profile = req.body.profile
  if (profile) {
    exec(`/usr/src/app/lib/equalizer/set_profile ${profile}`, (error) => {
      if (!error) {
        db.set('settings.audio_profile', profile)
          .write()

        res.send([{'message': 'Profile set', 'profile': profile}])
      }
    })
  }
})

router.get('/settings/profile/get', function (req, res) {
  let audio_profile = db.get('settings.audio_profile')
    .value()

  if (audio_profile) {
    res.send(audio_profile)
  }
})

module.exports = router