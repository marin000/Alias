const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerOptions = require('./docs/options-config')
const app = express()
const config = require('./config/index')
const dbMessages = require('./constants/dbMessages')
const { dbConnectionLogger, simpleLogger } = require('./logger/logger')
const cloudinary = require('cloudinary').v2
require('dotenv')
  .config()

const specs = swaggerJsDoc(swaggerOptions.options)

cloudinary.config({
  cloud_name: config.cloudinaryName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret
})
const router = require('./router')

app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
app.use(cors())
app.use(router)

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const { CONNECTED, ERROR_CONNECTING, PORT_LISTENING } = dbMessages
const { dbUrl, port } = config
mongoose.set('strictQuery', false)
mongoose.connect(dbUrl, connectionParams)
  .then(() => {
    simpleLogger.info(CONNECTED)
    dbConnectionLogger.info(CONNECTED)
  })
  .catch((err) => {
    simpleLogger.error(`${ERROR_CONNECTING} \n${err}`)
    dbConnectionLogger.error(`${ERROR_CONNECTING} \n${err}`)
  })

app.listen(port, function() {
  simpleLogger.info(PORT_LISTENING)
})