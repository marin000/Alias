/* eslint-disable new-cap */
const Results = require('../Models/Results')
const { validationResult } = require('express-validator')
const infoMessages = require('../constants/infoMessages')
const { resultsLogger } = require('../logger/logger')

const create = async(req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      resultsLogger.error(errors)
      res.status(403)
        .json({ errors: errors.array() })
      return
    }

    const { playerId, teamResults } = req.body
    const newResult = Results({ playerId, teamResults })
    const savedResult = await newResult.save()

    resultsLogger.info(infoMessages.NEW_RESULT)
    res.status(201)
      .send(savedResult)
  } catch (error) {
    resultsLogger.error((error.message, { metadata: error.stack }))
    return next(error)
  }
}

const fetch = async(req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      resultsLogger.error(errors)
      res.status(403)
        .json({ errors: errors.array() })
      return
    }

    const data = await Results.find({ playerId: req.params.id })
    resultsLogger.info(infoMessages.GET_RESULTS)
    res.json(data)
  } catch (error) {
    resultsLogger.error((error.message, { metadata: error.stack }))
    res.status(500)
      .send(error.message)
  }
}

const deleteResult = async(req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      resultsLogger.error(errors)
      res.status(403)
        .json({ errors: errors.array() })
      return
    }

    await Results.findByIdAndDelete(req.params.id)
    resultsLogger.info(infoMessages.DELETE_RESULT)
    res.status(204)
      .send()
  } catch (error) {
    resultsLogger.error(error.message, { metadata: error.stack })
    res.status(500)
      .send(error.message)
  }
}

module.exports = {
  create,
  fetch,
  deleteResult
}