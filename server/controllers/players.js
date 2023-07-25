/* eslint-disable new-cap */
const Players = require('../Models/Players')
const { validationResult } = require('express-validator')
const infoMessages = require('../constants/infoMessages')
const errorMessages = require('../constants/errorMessages')
const { playersLogger } = require('../logger/logger')

const create = async(req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      playersLogger.error(errors)
      res.status(403)
        .json({ errors: errors.array() })
      return
    }
    const { name, email, password, age } = req.body
    const newPlayer = Players({ name, email, password, age, gamesPlayed: 0, gamesWin: 0, gamesLost: 0 })
    await newPlayer.save()
    playersLogger.info(infoMessages.NEW_PLAYER)
    res.status(201)
      .send(newPlayer)
  } catch (error) {
    playersLogger.error((error.message, { metadata: error.stack }))
    if (error.code === 11000) {
      const fieldName = Object.keys(error.keyValue)[0]
      const capitalizedFieldName = fieldName.charAt(0)
        .toUpperCase() + fieldName.slice(1)
      const modifiedError = new Error(`${capitalizedFieldName} ${errorMessages.DEFAULT_DUPLICATE}`)
      res.status(400)
      return res.json({ error: modifiedError.message })
    }
    res.status(500)
      .send(error.message)
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

async function updatePlayer(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      playersLogger.error(errors)
      res.status(403)
        .json({ errors: errors.array() })
      return
    }
    const { id, team } = req.body
    const updatedPlayer = await Players.findByIdAndUpdate(id, { team })

    playersLogger.info(infoMessages.UPDATE_PLAYER)
    res.json(updatedPlayer)
  } catch (error) {
    playersLogger.error(error.message, { metadata: error.stack })
    res.status(500)
      .send(error.message)
  }
}

module.exports = {
  create,
  fetch,
  deletePlayer,
  updatePlayer
}