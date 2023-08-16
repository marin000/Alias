const mongoose = require('mongoose')
const Teams = require('./Teams')
const { playersLogger } = require('../logger/logger')

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

PlayersShema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate()
  const teamId = update.$set ? update.team : null

  if (teamId) {
    Teams.findById(teamId)
      .exec((error, t) => {
        if (error) {
          playersLogger.error(error)
          return next(error)
        }
        t.players.push(this._conditions._id)
        t.save(() => {
          next()
        })
      })
  } else {
    next()
  }
})

module.exports = mongoose.model('Players', PlayersShema)