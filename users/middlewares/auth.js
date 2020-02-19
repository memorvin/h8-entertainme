const {verifyToken} = require('../helpers/jwt'),
      User = require('../models/user')

module.exports = {
  authentication(req, res, next) {
    if (req.headers.hasOwnProperty('access_token')) {
      try{
        req.decoded = verifyToken(req.headers.access_token)
        User.findById(req.decoded.id)
          .then(user => {
            if (user) {
              next()
            } else {
              next({ status: 401, message: 'Invalid access' })
            }
          })
          .catch(next)
      } catch (err) {
        next(err)
      }
    } else {
      next({ status: 400, message: 'Please provide access token or log in to get one' })
    }
  }
}

