const { body } = require('express-validator')
const message = require('../constants/validatorMessages')

exports.validate = (method) => {
  switch (method) {
    case 'logValidate': {
      return [
        body('count', message.COUNT)
          .isNumeric(),
        body('sort', message.SORT)
          .isIn(['asc', 'desc']),
        body('level', message.LEVEL)
          .isIn(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
        body('message', message.MESSAGE)
          .matches(/^[a-zA-Z .,'-]+$/, 'i')
      ]
    }
  }
}