require('dotenv')
  .config()
const errorMessages = require('../constants/errorMessages')
const {
  DB_URL_MISSING,
  PORT_MISSING,
  TOKEN_MISSING,
  MISSING_CLOUDINARY_NAME,
  MISSING_CLOUDINARY_API_KEY,
  MISSING_CLOUDINARY_API_SECRET
} = errorMessages

if (!process.env.DB_URL) {
  throw new Error(DB_URL_MISSING)
} else if (!process.env.PORT) {
  throw new Error(PORT_MISSING)
} else if (!process.env.JWT_TOKEN) {
  throw new Error(TOKEN_MISSING)
} else if (!process.env.CLOUDINARY_NAME) {
  throw new Error(MISSING_CLOUDINARY_NAME)
} else if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error(MISSING_CLOUDINARY_API_KEY)
} else if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error(MISSING_CLOUDINARY_API_SECRET)
}

const config = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  token: process.env.JWT_TOKEN,
  cloudinaryName: process.env.CLOUDINARY_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  mailUsername: process.env.MAIL_USERNAME,
  mailPassword: process.env.MAIL_PASSWORD,
  mailFrom: 'Alias Team' || 'test@gmail.com',
  mailConfig: {
    service: process.env.MAIL_USERNAME && process.env.MAIL_PASSWORD
      ? 'gmail'
      : '',
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false
  }
}

module.exports = config