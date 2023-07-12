const { body, check } = require('express-validator')
const message = require('../constants/validatorMessages')

exports.validate = (method) => {
  switch (method) {
    case 'create': {
      return [
        body('name', message.NAME_SHORT)
          .isLength({ min: 2 }),
        body('name', message.NAME_LONG)
          .isLength({ max: 25 }),
        body('name', message.NAME_CONTAIN_NUM)
          .isAlpha('en-US', { ignore: ' ' })
      ]
    }
    case 'validatePlayer': {
      return [
        check('id', message.PLAYER_ID)
          .isMongoId()
      ]
    }
  }
}