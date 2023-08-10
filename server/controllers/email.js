/* eslint-disable new-cap */
const Players = require('../Models/Players')
const emailService = require('../service/email')
const errorMessages = require('../constants/errorMessages')
const { emailLogger } = require('../logger/logger')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/index')

const generateResetToken = (playerId) => {
  const token = jwt.sign(
    { playerId: playerId },
    config.token,
    { expiresIn: '1h' }
  )
  return token
}

const sendResetLink = async(req, res) => {
  try {
    const { email, language } = req.body
    const player = await Players.findOne({ email })
    if (!player) {
      return res.status(401)
        .json({ error: errorMessages.INVALID_EMAIL })
    }
    const resetToken = generateResetToken(player._id)
    player.resetToken = resetToken
    player.resetTokenExpiration = Date.now() + 3600000
    await player.save()

    const resetLink = `https://yourwebsite.com/reset-password?token=${resetToken}`

    emailService.sendEmail({ username: player.name, recipientAddress: email, language, resetLink })
    res.status(201)
      .send()
  } catch (error) {
    emailLogger.error((error.message, { metadata: error.stack }))
    res.status(500)
      .send(error.message)
  }
}

module.exports = {
  sendResetLink
}