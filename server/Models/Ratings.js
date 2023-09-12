const mongoose = require('mongoose')

const RatingsShema = new mongoose.Schema({
  stars: {
    type: Number,
    required: true
  },
  comment: String
}, { timestamps: true }
)

module.exports = mongoose.model('Ratings', RatingsShema)