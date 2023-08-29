const { check, body } = require('express-validator')
const message = require('../constants/validatorMessages')

exports.validate = (method) => {
  switch (method) {
    case 'create': {
      return [
        body('playerId', message.PLAYER_ID)
          .isMongoId()
      ]
    }
    case 'validateGetDelete': {
      return [
        check('id', message.RESULT_ID)
          .isMongoId()
      ]
    }
  }
}