const express = require('express')
const playerController = require('./controllers/players')
const router = express.Router()

router.post('/player', playerController.create)
router.get('/player', playerController.fetch)
router.delete('/deletePlayer/:id', playerController.deletePlayer)

module.exports = router