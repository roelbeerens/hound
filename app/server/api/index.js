const express = require('express')
const player = require('./player')
const radio = require('./radio')
const settings = require('./settings')
const supervisor = require('./supervisor')
const router = express.Router()

router.use(player.router)
router.use(radio)
router.use(settings)
router.use(supervisor)

module.exports = router