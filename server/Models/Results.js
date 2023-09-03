const mongoose = require('mongoose')

const playerResultSchema = new mongoose.Schema({
  name: String,
  scoreExplains: Number,
  scoreGuess: Number
})

const teamResultSchema = new mongoose.Schema({
  name: String,
  score: Number,
  players: [playerResultSchema]
})

const mainResultSchema = new mongoose.Schema({
  playerId: String,
  winnerTeam: String,
  teamResults: [teamResultSchema]
}, { timestamps: true, toJSON: { getters: true } })

module.exports = mongoose.model('Results', mainResultSchema)