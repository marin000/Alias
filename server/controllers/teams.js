/* eslint-disable new-cap */
const Teams = require('../Models/Teams')
const Players = require('../Models/Players')
const { validationResult } = require('express-validator')
const infoMessages = require('../constants/infoMessages')
const { teamsLogger } = require('../logger/logger')

const create = async(req, res, next) => {
  try {
    const { name, players, playerId } = req.body
    const newTeam = Teams({ name, players, gamesPlayed: 0, gamesWin: 0, gamesLost: 0 })
    const savedTeam = await newTeam.save()

    await Players.findByIdAndUpdate(playerId, { team: savedTeam })
    teamsLogger.info(infoMessages.NEW_TEAM)
    res.status(201)
      .send(newTeam)
  } catch (error) {
    teamsLogger.error((error.message, { metadata: error.stack }))
    return next(error)
  }
}

const fetch = async(req, res) => {
  try {
    const data = await Teams.find({})
      .populate('players')
    teamsLogger.info(infoMessages.GET_TEAMS)
    res.json(data)
  } catch (error) {
    teamsLogger.error((error.message, { metadata: error.stack }))
    res.status(500)
      .send(error.message)
  }
}

const deleteTeam = async(req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      teamsLogger.error(errors)
      res.status(403)
        .json({ errors: errors.array() })
      return
    }
    const teamId = req.params.id
    await Teams.findByIdAndDelete(teamId)
    teamsLogger.info(infoMessages.DELETE_TEAM)
    res.status(204)
      .send()
  } catch (error) {
    teamsLogger.error(error.message, { metadata: error.stack })
    res.status(500)
      .send(error.message)
  }
}

module.exports = {
  create,
  fetch,
  deleteTeam
}