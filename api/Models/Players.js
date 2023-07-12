const mongoose = require('mongoose')

const PlayersShema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Player must have a name!'
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  age: Number,
  gamesPlayed: Number,
  gamesWin: Number,
  gamesLost: Number
}, { timestamps: true }
)

module.exports = mongoose.model('Players', PlayersShema)