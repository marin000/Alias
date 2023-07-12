/* eslint-disable new-cap */
const Players = require('../Models/Players')
const { validationResult } = require('express-validator')
const infoMessages = require('../constants/infoMessages')
const { playersLogger } = require('../logger/logger')

const create = async(req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      playersLogger.error(errors)
      res.status(403)
        .json({ errors: errors.array() })
      return
    }
    const { name, email, password, age, gamesPlayed, gamesWin, gamesLost } = req.body
    const newPlayer = Players({ name, email, password, age, gamesPlayed, gamesWin, gamesLost })
    await newPlayer.save()
    playersLogger.info(infoMessages.NEW_PLAYER)
    res.status(201)
      .send(newPlayer)
  } catch (error) {
    playersLogger.error((error.message, { metadata: error.stack }))
    return next(error)
  }
}

const fetch = async(req, res) => {
  try {
    const data = await Players.find({})
    playersLogger.info(infoMessages.GET_PLAYERS)
    res.json(data)
  } catch (error) {
    playersLogger.error((error.message, { metadata: error.stack }))
    res.status(500)
      .send(error.message)
  }
}

const deletePlayer = async(req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      playersLogger.error(errors)
      res.status(403)
        .json({ errors: errors.array() })
      return
    }
    const playerId = req.params.id
    await Players.findByIdAndDelete(playerId)
    playersLogger.info(infoMessages.DELETE_PLAYER)
    res.status(204)
      .send()
  } catch (error) {
    playersLogger.error(error.message, { metadata: error.stack })
    res.status(500)
      .send(error.message)
  }
}

module.exports = {
  create,
  fetch,
  deletePlayer
}