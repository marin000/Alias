const express = require('express')
const mongoose = require('mongoose')
const app = express()
const config = require('./config/index')
const dbMessages = require('./constants/dbMessages')
require('dotenv')
  .config()
const router = require('./router')

app.use(express.json())
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
    console.log(CONNECTED)
  })
  .catch((err) => {
    console.error(`${ERROR_CONNECTING} \n${err}`)
  })

app.listen(port, function() {
  console.log(PORT_LISTENING)
})