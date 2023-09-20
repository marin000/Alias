require('dotenv')
  .config()

const allowedEmails = process.env.ALLOWED_EMAILS.split(',')

const checkInvitation = () => {
  return (req, res, next) => {
    const userEmail = req.header('Invitation')
    if (allowedEmails.includes(userEmail)) {
      next()
    } else {
      res.sendStatus(401)
    }
  }
}

module.exports = { checkInvitation }