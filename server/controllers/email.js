/* eslint-disable new-cap */
const Players = require('../Models/Players')
const emailService = require('../service/email')
const errorMessages = require('../constants/errorMessages')
const { emailLogger } = require('../logger/logger')
const crypto = require('crypto')
const config = require('../config/index')

const generateRandomPin = () => {
  const pinLength = parseInt(config.pinLength)
  const randomBytes = crypto.randomBytes(pinLength)
  const pin = randomBytes.reduce((acc, byte) => acc + byte.toString()
    .padStart(2, '0'), '')
  return pin.substring(0, pinLength)
}

const sendResetLink = async(req, res) => {
  try {
    const { email, language } = req.body
    const player = await Players.findOne({ email })
    if (!player) {
      return res.status(401)
        .json({ error: errorMessages.INVALID_EMAIL })
    }
    const resetPin = generateRandomPin()
    player.resetPin = resetPin
    player.resetPinExpiration = Date.now() + 60000
    await player.save()

    emailService.sendEmail({ username: player.name, recipientAddress: email, language, resetPin })
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