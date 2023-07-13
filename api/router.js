const express = require('express')
const playerController = require('./controllers/players')
const teamController = require('./controllers/teams')
const logController = require('./controllers/logs')
const playerValidator = require('./validators/playersValidator')
const teamValidator = require('./validators/teamsValidator')
const logerValidator = require('./validators/loggerValidator')
const router = express.Router()

router.post('/player', playerValidator.validate('create'), playerController.create)
router.get('/player', playerController.fetch)
router.delete('/deletePlayer/:id', playerValidator.validate('validatePlayer'), playerController.deletePlayer)
router.put('/updatePlayer', playerValidator.validate('validateMongoIdAndTeam'), playerController.updatePlayer)

router.post('/team', teamController.create)
router.get('/team', teamController.fetch)
router.delete('/deleteTeam/:id', teamValidator.validate('validateTeam'), teamController.deleteTeam)

router.post('/logs', logerValidator.validate('logValidate'), logController.getLogs)

module.exports = router