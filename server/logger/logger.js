const { createLogger, format, transports } = require('winston')
const { combine, timestamp, json, printf } = format
require('dotenv')
  .config()
require('winston-mongodb')

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5
  }
}

const loggerFormat = combine(
  timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  json(),
  format.metadata()
)

const loggerTransports = [
  new transports.File({ filename: 'logs/logMessages.log' }),
  new transports.MongoDB({
    levels: customLevels.levels,
    db: process.env.DB_URL,
    options: {
      useUnifiedTopology: true
    },
    collection: 'logs',
    format: format.combine(
      format.timestamp(),
      format.json())
  })]

const dbConnectionLogger = createLogger({
  levels: customLevels.levels,
  defaultMeta: { component: 'dbConnection' },
  format: loggerFormat,
  transports: loggerTransports
})

const playersLogger = createLogger({
  levels: customLevels.levels,
  defaultMeta: { component: 'players' },
  format: loggerFormat,
  transports: loggerTransports
})

const teamsLogger = createLogger({
  levels: customLevels.levels,
  defaultMeta: { component: 'teams' },
  format: loggerFormat,
  transports: loggerTransports
})

const logsLogger = createLogger({
  levels: customLevels.levels,
  defaultMeta: { component: 'logs' },
  format: loggerFormat,
  transports: loggerTransports
})

const emailLogger = createLogger({
  levels: customLevels.levels,
  format: loggerFormat,
  transports: loggerTransports
})

const resultsLogger = createLogger({
  levels: customLevels.levels,
  defaultMeta: { component: 'results' },
  format: loggerFormat,
  transports: loggerTransports
})

const simpleFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`
})

const simpleLogger = createLogger({
  levels: customLevels.levels,
  format: combine(
    timestamp(),
    format.align(),
    simpleFormat
  ),
  transports: [
    new transports.Console()
  ]
})

module.exports = {
  dbConnectionLogger: dbConnectionLogger,
  playersLogger: playersLogger,
  teamsLogger: teamsLogger,
  simpleLogger: simpleLogger,
  logsLogger: logsLogger,
  emailLogger: emailLogger,
  resultsLogger: resultsLogger
}