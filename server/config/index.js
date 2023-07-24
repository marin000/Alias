require('dotenv')
  .config()
const errorMessages = require('../constants/errorMessages')
const { DB_URL_MISSING, PORT_MISSING } = errorMessages

if (!process.env.DB_URL) {
  throw new Error(DB_URL_MISSING)
}

if (!process.env.PORT) {
  throw new Error(PORT_MISSING)
}

const config = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL
}

module.exports = config