const mongoose = require('mongoose')

const PlayersShema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
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
    type: String
  },
  team:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teams'
  },
  country: String,
  gamesPlayed: Number,
  gamesWin: Number,
  gamesLost: Number,
  image: String,
  resetPin: String,
  resetPinExpiration: Date
}, { timestamps: true }
)

module.exports = mongoose.model('Players', PlayersShema)