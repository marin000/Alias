require('dotenv')
  .config()

const allowedEmails = process.env.ALLOWED_EMAILS.split(',')
console.log(allowedEmails)
const checkInvitation = () => {
  return (req, res, next) => {
    const userEmail = req.header('Invitation')
    console.log(userEmail)
    if (allowedEmails.includes(userEmail)) {
      next()
    } else {
      res.sendStatus(401)
    }
  }
}

module.exports = { checkInvitation }