/* eslint-disable new-cap */
const Players = require('../Models/Players')
const { validationResult } = require('express-validator')
const infoMessages = require('../constants/infoMessages')
const errorMessages = require('../constants/errorMessages')
const { playersLogger } = require('../logger/logger')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/index')
const cloudinary = require('cloudinary').v2

const createModifiedError = (error) => {
  const fieldName = Object.keys(error.keyValue)[0]
  const capitalizedFieldName = fieldName.charAt(0)
    .toUpperCase() + fieldName.slice(1)
  return new Error(`${capitalizedFieldName} ${errorMessages.DEFAULT_DUPLICATE}`)
}

const deleteImageCloudinary = (oldImage) => {
  const oldImageId = oldImage.split('/')
    .pop()
    .split('.')
    .shift()
  cloudinary.uploader
    .destroy(oldImageId)
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
    const { id, email, name, team, image, password } = req.body
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
      updateFields.image = image.newImage
      if (image.oldImage) {
        deleteImageCloudinary(image.oldImage)
      }
    }

    if (password) {
      const player = await Players.findOne({ _id: id })
      const passwordMatch = await bcrypt.compare(password.oldPassword, player.password)
      if (passwordMatch) {
        const hashedPassword = await bcrypt.hash(password.newPassword, 10)
        updateFields.password = hashedPassword
      } else {
        return res.status(401)
          .json({ error: errorMessages.INVALID_CURRENT_PASSWORD })
      }
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

async function resetPassword(req, res) {
  try {
    const { email, password } = req.body
    const player = await Players.findOne({ email })

    const hashedPassword = await bcrypt.hash(password, 10)
    player.password = hashedPassword
    await player.save()

    playersLogger.info(infoMessages.UPDATE_PLAYER_PASSWORD)
    res.status(200)
      .json({ message: infoMessages.UPDATE_PLAYER_PASSWORD })
  } catch (error) {
    playersLogger.error((error.message, { metadata: error.stack }))
    res.status(500)
      .send(error.message)
  }
}
async function getPlayer(req, res) {
  try {
    const { email, password } = req.body
    const player = await Players.findOne({ email })
      .populate('team')
    if (!player) {
      playersLogger.error(errorMessages.INVALID_LOGIN)
      return res.status(401)
        .json({ error: errorMessages.INVALID_LOGIN })
    }
    const passwordMatch = bcrypt.compare(password, player.password)
    if (passwordMatch) {
      const token = jwt.sign({ playerId: player._id }, config.token, { expiresIn: '4d' })
      playersLogger.info(infoMessages.GET_PLAYER)
      res.json({ player, token })
    } else {
      playersLogger.error(errorMessages.INVALID_LOGIN)
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
      playersLogger.info(infoMessages.GET_PLAYER)
      return res.status(404)
        .json({ message: errorMessages.NO_PLAYER })
    }
    res.json(player)
  } catch (error) {
    playersLogger.error(error.message, { metadata: error.stack })
    res.status(401)
      .json({ message: errorMessages.INVALID_TOKEN })
  }
}

const validatePin = async(req, res) => {
  try {
    const { email, pin } = req.body
    const player = await Players.findOne({ email })

    if (!player) {
      return res.status(401)
        .json({ error: errorMessages.INVALID_EMAIL })
    }

    if (player.resetPin !== pin) {
      return res.status(401)
        .json({ error: errorMessages.INVALID_PIN })
    }

    if (player.resetPinExpiration < Date.now()) {
      return res.status(401)
        .json({ error: errorMessages.EXPIRED_PIN })
    }

    player.resetPin = null
    player.resetPinExpiration = null
    await player.save()

    playersLogger.info(infoMessages.VALID_PIN)
    res.status(200)
      .json({ message: infoMessages.VALID_PIN })
  } catch (error) {
    playersLogger.error((error.message, { metadata: error.stack }))
    res.status(500)
      .send(error.message)
  }
}

module.exports = {
  create,
  fetch,
  deletePlayer,
  updatePlayer,
  getPlayer,
  getPlayerByToken,
  validatePin,
  resetPassword
}