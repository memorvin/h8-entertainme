'use strict'

const User = require('../models/user'),
      { validatePass } = require('../helpers/bcrypt'),
      { generateToken } = require('../helpers/jwt'),
      userErr = { status: 404, resource: 'User'},
      loginErr = { status: 400, message: 'Incorrect email/password'}

module.exports = class Controller {

  static register(req, res, next) {
    const { name, email, password } = req.body
    User.create({ name, email, password })
      .then(user => {
        let payload = {
          id: user._id
        }
        let token = generateToken(payload)
        res.status(201).json({ _id: user._id, isAdmin: user.isAdmin, name: user.name, email: user.email, image: user.image, access_token: token })
      })
      .catch(next)
  }

  static login(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          next(loginErr);
        } else if (validatePass(req.body.password, user.password)) {
          let payload = {
            id : user._id
          };
          let token = generateToken(payload);
          res.status(200).json({ _id: user._id, isAdmin: user.isAdmin, name: user.name, email: user.email, image: user.image, access_token: token })
        } else {
          next(loginErr);
        }
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    User.findById(req.params.id).select('-password')
      .then(data => {
        if (!data) {
          throw userErr
        }
        res.status(200).json(data)
      })
      .catch(next)
  }
  
  static addMovie(req, res, next) {
    const obj = {
      _id: req.body._id,
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      year: req.body.year
    }
    User.findById(req.body.user)
      .then(user => {
        let duplicate = false
        if (!user) {
          throw userErr
        } else {
          user.movies.forEach(movie => {
            if (String(movie._id) === String(req.body._id)) {
              duplicate = true
            }
          })
          if (!duplicate) {
            return User.findByIdAndUpdate(
              req.body.user,
              {$addToSet: { movies: obj }}
            )
          } else {
            return user
          }
        }
      })
      .then(data => {
        res.status(200).json(data) 
      })
      .catch(next)
  }

  static addShow(req, res, next) {
    let obj = {
      _id: req.body._id,
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      year: req.body.year
    }
    User.findById(req.body.user)
      .then(user => {
        let duplicate = false
        if (!user) {
          throw userErr
        } else {
          user.shows.forEach(show => {
            if (String(show._id) === String(req.body._id)) {
              duplicate = true
            }
          })
          if (!duplicate) {
            return User.findByIdAndUpdate(
              req.body.user,
              {$addToSet: { shows: obj }}
            )
          } else {
            return user
          }
        }
      })
      .then(data => {
        res.status(200).json(data) 
      })
      .catch(next)
  }
}