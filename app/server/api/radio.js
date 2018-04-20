const express = require('express')
const router = express.Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('/data/radio.json')
const db = low(adapter)
const TuneIn = require('node-tunein-radio')
const radio = new TuneIn({
  protocol: 'https',
  cacheRequests: false,
  cacheTTL: 1000 * 60 * 5,
})
const player = require('./player')

router.get('/radio/stations', function (req, res) {
  radio.browse_local().then(function (result) {
    res.send(result.body[0].children)
  }).catch(function (err) {
    res.send(err)
  })
})

router.get('/radio/stations/:guide_id', function (req, res) {
  let quide_id = req.params.guide_id;
  if (quide_id) {
    radio.describe(quide_id).then(function (result) {
      res.send(result.body[0])
    }).catch(function (err) {
      res.send(err)
    })
  }
})

router.get('/radio/favorites', function (req, res) {
  let radio_stations = db.get('radio_stations')
    .value()

  Promise.all(radio_stations.map(radio_station => {
    return radio.describe(radio_station.guide_id)
  })).then(results => {
    res.send(results)
  })

});

router.post('/radio/stations/favorite/add', function (req, res) {
  let quide_id = req.body.guide_id;
  if (quide_id) {
    let station = db.get('radio_stations')
      .find({'guide_id': quide_id})
      .value()

    if (station) {
      db.get('radio_stations')
        .find({'guide_id': quide_id})
        .assign({'guide_id': quide_id})
        .write()
    } else {
      db.get('radio_stations')
        .push({'guide_id': quide_id})
        .write()
    }

    let radio_stations = db.get('radio_stations')
      .value()

    Promise.all(radio_stations.map(radio_station => {
      return radio.describe(radio_station.guide_id)
    })).then(results => {
      res.send(results)
    })
  }
})

router.post('/radio/stations/favorite/remove', function (req, res) {
  let quide_id = req.body.guide_id;
  if (quide_id) {
    db.get('radio_stations')
      .remove({'guide_id': quide_id})
      .write()

    let radio_stations = db.get('radio_stations')
      .value()

    Promise.all(radio_stations.map(radio_station => {
      return radio.describe(radio_station.guide_id)
    })).then(results => {
      res.send(results)
    })
  }
})

router.post('/radio/search', function (req, res) {
  let query = req.body.query
  if (query) {
    radio.search(query).then(function (result) {
      res.send(result.body)
    }).catch(function (err) {
      res.send(err)
    })
  }
})

router.post('/radio/play', function (req, res) {
  let guide_id = req.body.guide_id
  if (guide_id) {
    radio.tune_radio(guide_id).then(function (result) {
      let url = result.body[0].url
      if (url) {
        player.player.stop()
        player.player.load(url)

        res.send([{'message': 'Player started', 'status': 'playing'}])
      }
    }).catch(function (err) {
      res.send(err)
    })
  }
})

module.exports = router