const express = require('express')
const { checkInvitation } = require('./service/apiSecurity')
const playerController = require('./controllers/players')
const teamController = require('./controllers/teams')
const logController = require('./controllers/logs')
const emailController = require('./controllers/email')
const resultController = require('./controllers/results')
const ratingController = require('./controllers/ratings')
const playerValidator = require('./validators/playersValidator')
const teamValidator = require('./validators/teamsValidator')
const logerValidator = require('./validators/loggerValidator')
const resultValidator = require('./validators/resultValidator')
const router = express.Router()

router.use(checkInvitation())

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

router.post('/api/result', resultValidator.validate('create'), resultController.create)
router.get('/api/result/:id', resultValidator.validate('validateGetDelete'), resultController.fetch)
router.delete('/api/result/:id', resultValidator.validate('validateGetDelete'), resultController.deleteResult)

router.post('/logs', logerValidator.validate('logValidate'), logController.getLogs)

router.post('/api/email', emailController.sendResetLink)

router.post('/api/rating', ratingController.create)
router.get('/api/rating', ratingController.fetch)

module.exports = router