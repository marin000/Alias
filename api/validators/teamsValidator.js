const { check } = require('express-validator')
const message = require('../constants/validatorMessages')

exports.validate = (method) => {
  switch (method) {
    case 'validateTeam': {
      return [
        check('id', message.TEAM_ID)
          .isMongoId()
      ]
    }
  }
}