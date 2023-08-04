const express = require('express')
const playerController = require('./controllers/players')
const teamController = require('./controllers/teams')
const logController = require('./controllers/logs')
const playerValidator = require('./validators/playersValidator')
const teamValidator = require('./validators/teamsValidator')
const logerValidator = require('./validators/loggerValidator')
const router = express.Router()

router.post('/api/player', playerValidator.validate('create'), playerController.create)
router.post('/api/player/login', playerController.getPlayer)
router.get('/api/player/login', playerController.getPlayerByToken)
router.get('/api/player/all', playerController.fetch)
router.delete('/api/player/:id', playerValidator.validate('validatePlayer'), playerController.deletePlayer)
router.put('/api/player', playerValidator.validate('validatePlayer'), playerController.updatePlayer)

router.post('/api/team', teamController.create)
router.get('/api/team', teamController.fetch)
router.delete('/api/team/:id', teamValidator.validate('validateTeam'), teamController.deleteTeam)

router.post('/logs', logerValidator.validate('logValidate'), logController.getLogs)

module.exports = router