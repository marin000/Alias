const express = require('express')
const playerController = require('./controllers/players')
const teamController = require('./controllers/teams')
const logController = require('./controllers/logs')
const emailController = require('./controllers/email')
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
router.post('/api/player/pin', playerController.validatePin)
router.post('/api/player/resetPassword', playerController.resetPassword)

router.post('/api/team', teamController.create)
router.get('/api/team', teamController.fetch)
router.delete('/api/team/:id', teamValidator.validate('validateTeam'), teamController.deleteTeam)
router.put('/api/team', teamValidator.validate('validateTeam'), teamController.updateTeam)

router.post('/logs', logerValidator.validate('logValidate'), logController.getLogs)

router.post('/api/email', emailController.sendResetLink)

module.exports = router