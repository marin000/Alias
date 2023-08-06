/* eslint-disable new-cap */
const Players = require('../Models/Players')
const { validationResult } = require('express-validator')
const infoMessages = require('../constants/infoMessages')
const errorMessages = require('../constants/errorMessages')
const { playersLogger } = require('../logger/logger')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/index')

const createModifiedError = (error) => {
  const fieldName = Object.keys(error.keyValue)[0]
  const capitalizedFieldName = fieldName.charAt(0)
    .toUpperCase() + fieldName.slice(1)
  return new Error(`${capitalizedFieldName} ${errorMessages.DEFAULT_DUPLICATE}`)
}

const create = async(req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      playersLogger.error(errors)
      res.status(403)
        .json({ errors: errors.array() })
      return
    }
    const { name, email, password, country } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newPlayer = Players({ name, email, password: hashedPassword, country, gamesPlayed: 0, gamesWin: 0, gamesLost: 0 })
    await newPlayer.save()
    playersLogger.info(infoMessages.NEW_PLAYER)
    res.status(201)
      .send(newPlayer)
  } catch (error) {
    playersLogger.error((error.message, { metadata: error.stack }))
    if (error.code === 11000) {
      const modifiedError = createModifiedError(error)
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
    const { id, email, name, team, image } = req.body
    const updateFields = {}

    if (email) {
      updateFields.email = email
    }

    if (name) {
      updateFields.name = name
    }

    if (team) {
      updateFields.team = team
    }

    if (image) {
      updateFields.image = image
    }

    const updatedPlayer = await Players.findByIdAndUpdate(id, updateFields, { new: true })
    playersLogger.info(infoMessages.UPDATE_PLAYER)
    res.json(updatedPlayer)
  } catch (error) {
    playersLogger.error((error.message, { metadata: error.stack }))
    if (error.code === 11000) {
      const modifiedError = createModifiedError(error)
      res.status(400)
      return res.json({ error: modifiedError.message })
    }
    res.status(500)
      .send(error.message)
  }
}

async function getPlayer(req, res) {
  try {
    const { email, password } = req.body
    const player = await Players.findOne({ email })
      .populate('team')
    const passwordMatch = await bcrypt.compare(password, player.password)
    if (passwordMatch) {
      playersLogger.info(infoMessages.GET_PLAYER)
      const token = jwt.sign({ playerId: player._id }, config.token, { expiresIn: '4d' })
      res.json({ player, token })
    } else {
      res.status(401)
        .json({ error: errorMessages.INVALID_LOGIN })
    }
  } catch (error) {
    playersLogger.error(error.message, { metadata: error.stack })
    res.status(500)
      .send(error.message)
  }
}

async function getPlayerByToken(req, res) {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401)
      .json({ message: errorMessages.NO_TOKEN_PROVIDED })
  }

  try {
    const decoded = jwt.verify(token, config.token)
    const player = await Players.findById(decoded.playerId)
      .populate('team')

    if (!player) {
      return res.status(404)
        .json({ message: errorMessages.NO_PLAYER })
    }
    res.json(player)
  } catch (error) {
    res.status(401)
      .json({ message: errorMessages.INVALID_TOKEN })
  }
}

module.exports = {
  create,
  fetch,
  deletePlayer,
  updatePlayer,
  getPlayer,
  getPlayerByToken
}