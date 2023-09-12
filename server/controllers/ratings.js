/* eslint-disable new-cap */
const Ratings = require('../Models/Ratings')
const { ratingsLogger } = require('../logger/logger')
const infoMessages = require('../constants/infoMessages')

const create = async(req, res, next) => {
  try {
    const { stars, comment } = req.body
    const newRating = Ratings({ stars, comment })
    const savedRating = await newRating.save()

    ratingsLogger.info(infoMessages.NEW_TEAM)
    res.status(201)
      .send(savedRating)
  } catch (error) {
    ratingsLogger.error((error.message, { metadata: error.stack }))
    return next(error)
  }
}

const fetch = async(req, res) => {
  try {
    const data = await Ratings.find({})
    ratingsLogger.info(infoMessages.GET_RATINGS)
    res.json(data)
  } catch (error) {
    ratingsLogger.error((error.message, { metadata: error.stack }))
    res.status(500)
      .send(error.message)
  }
}

module.exports = {
  create,
  fetch
}