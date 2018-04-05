const express = require('express')
const router = express.Router()
const TuneIn = require('node-tunein-radio')
const radio = new TuneIn({
  protocol: 'https',
  cacheRequests: false,
  cacheTTL: 1000 * 60 * 5,
})

router.get('/radio/stations', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  radio.browse_local().then(function (result) {
    res.send(result.body[0].children)
  }).catch(function (err) {
    res.send(err)
  })
})

router.post('/radio/search', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let query = req.body.query

  radio.search(query).then(function (result) {
    res.send(result.body)
  }).catch(function (err) {
    res.send(err)
  })
})

module.exports = router