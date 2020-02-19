'use strict'

const bcrypt = require('bcryptjs')

module.exports = {
  hashPass(pass) {
    return bcrypt.hashSync(pass, 8)
  },

  validatePass(pass, hash) {
    return bcrypt.compareSync(pass, hash)
  }
}