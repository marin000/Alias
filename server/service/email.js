const nodemailer = require('nodemailer')
const { simpleLogger, emailLogger } = require('../logger/logger')
const config = require('../config/index')
const errorMessages = require('../constants/errorMessages')
const infoMessages = require('../constants/infoMessages')

async function sendEmail(options) {
  const {
    emailSubject,
    emailMessage,
    recipientAddress,
    attachmentName = null,
    attachmentPath = null
  } = options

  const testAccount = await nodemailer.createTestAccount()
  const { user, pass } = testAccount
  const {
    mailUsername, mailPassword, mailFrom,
    mailConfig: { service, host, port, secure }
  } = config

  const transporter = nodemailer.createTransport({
    service: service,
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: mailUsername || user,
      pass: mailPassword || pass
    }
  })

  const mailOptions = {
    from: mailFrom,
    to: recipientAddress,
    subject: emailSubject,
    text: emailMessage,
    attachments: attachmentName
      ? [{
        filename: attachmentName,
        path: attachmentPath
      }]
      : null
  }
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      emailLogger.error(error)
    } else if (!mailOptions.text) {
      throw new Error(errorMessages.EMAIL_TEXT_MISSING)
    } else {
      simpleLogger.info(infoMessages.EMAIL_SENT + info.response)
    }
  })
}
module.exports = { sendEmail }