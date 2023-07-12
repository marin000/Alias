const mongoose = require('mongoose')

const TeamsShema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Team must have a name!'
  },
  gamesPlayed: Number,
  gamesWin: Number,
  gamesLost: Number
}, { timestamps: true }
)

module.exports = mongoose.model('Teams', TeamsShema)