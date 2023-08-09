/* eslint-disable new-cap */
const Players = require('../Models/Players')
const emailService = require('../service/email')
const errorMessages = require('../constants/errorMessages')
const infoMessages = require('../constants/infoMessages')
const { emailLogger } = require('../logger/logger')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const sendResetLink = async(req, res) => {
  try {
    const { email, subject, message } = req.body
    const player = await Players.findOne({ email })
    if (!player) {
      return res.status(401)
        .json({ error: errorMessages.INVALID_EMAIL })
    }
    emailService.sendEmail({
      emailSubject: subject,
      emailMessage: message,
      recipientAddress: email
    })
    res.status(201)
      .send(infoMessages.EMAIL_SENT)
  } catch (error) {
    emailLogger.error((error.message, { metadata: error.stack }))
    res.status(500)
      .send(error.message)
  }
}

module.exports = {
  sendResetLink
}