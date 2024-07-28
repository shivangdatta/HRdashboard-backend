const express = require('express')
const router = express.Router()
const dashController = require('../controller/dashController') 

router.route('/')
    .get(dashController.getStats)

module.exports = router