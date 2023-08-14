const path = require('path')
const nodemailer = require('nodemailer')
const Handlebars = require('handlebars')
const fs = require('fs')
const util = require('util')
const readFileAsync = util.promisify(fs.readFile)
const { simpleLogger, emailLogger } = require('../logger/logger')
const config = require('../config/index')
const errorMessages = require('../constants/errorMessages')
const infoMessages = require('../constants/infoMessages')

async function sendEmail(options) {
  const { username, recipientAddress, language, resetPin } = options

  const templateFilePath = path.resolve(__dirname, '../emailTemplate/template.html')
  const languageFilePath = path.resolve(__dirname, `../emailTemplate/${language}.json`)

  const templateFileContent = await readFileAsync(templateFilePath, 'utf8')
  const languageFileContent = await readFileAsync(languageFilePath, 'utf8')
  const languageFile = JSON.parse(languageFileContent)

  const template = Handlebars.compile(templateFileContent)

  const data = {
    username,
    resetPin,
    resetPasswordSubject: languageFile.resetPasswordSubject,
    resetPasswordWelcome: languageFile.resetPasswordWelcome,
    resetPasswordIgnor: languageFile.resetPasswordIgnor,
    resetPasswordPin: languageFile.resetPasswordPin,
    warning: languageFile.warning,
    resetPasswordSupport: languageFile.resetPasswordSupport
  }
  const customizedTemplate = template(data)

  const testAccount = await nodemailer.createTestAccount()
  const { user, pass } = testAccount
  const {
    mailUsername,
    mailPassword,
    mailFrom,
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
    subject: languageFile.resetPasswordSubject,
    html: customizedTemplate,
    text: languageFile.resetPasswordText
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