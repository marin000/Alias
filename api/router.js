const express = require('express')
const playerController = require('./controllers/players')
const logController = require('./controllers/logs')
const playerValidator = require('./validators/playersValidator')
const logerValidator = require('./validators/loggerValidator')
const router = express.Router()

router.post('/player', playerValidator.validate('create'), playerController.create)
router.get('/player', playerController.fetch)
router.delete('/deletePlayer/:id', playerValidator.validate('validatePlayer'), playerController.deletePlayer)

router.post('/logs', logerValidator.validate('logValidate'), logController.getLogs)

module.exports = router