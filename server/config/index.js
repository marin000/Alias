require('dotenv')
  .config()
const errorMessages = require('../constants/errorMessages')
const { DB_URL_MISSING, PORT_MISSING, TOKEN_MISSING } = errorMessages

if (!process.env.DB_URL) {
  throw new Error(DB_URL_MISSING)
} else if (!process.env.PORT) {
  throw new Error(PORT_MISSING)
} else if (!process.env.JWT_TOKEN) {
  throw new Error(TOKEN_MISSING)
}

const config = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  token: process.env.JWT_TOKEN
}

module.exports = config