/* eslint-disable new-cap */
const Players = require('../Models/Players')
const infoMessages = require('../constants/infoMessages')

async function create(req, res, next) {
  try {
    const { name, email, password, age, gamesPlayed, gamesWin, gamesLost } = req.body
    const newPlayer = Players({ name, email, password, age, gamesPlayed, gamesWin, gamesLost })
    await newPlayer.save()
    console.log(infoMessages.NEW_PLAYER)
    res.status(201)
      .send(newPlayer)
  } catch (error) {
    console.log(error(error.message, { metadata: error.stack }))
    return next(error)
  }
}

async function fetch(req, res) {
  try {
    const data = await Players.find({})
    console.log(infoMessages.GET_PLAYERS)
    res.json(data)
  } catch (error) {
    console.log((error.message, { metadata: error.stack }))
    res.status(500)
      .send(error.message)
  }
}

async function deletePlayer(req, res) {
  try {
    const playerId = req.params.id
    await Players.findByIdAndDelete(playerId)
    console.log(infoMessages.DELETE_PLAYER)
    res.status(204)
      .send()
  } catch (error) {
    console.log(error.message, { metadata: error.stack })
    res.status(500)
      .send(error.message)
  }
}

module.exports = {
  create,
  fetch,
  deletePlayer
}