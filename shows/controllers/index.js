'use strict'
const Show = require('../models/show'),
      showErr = { status: 404, resource: 'Show'}

module.exports = class Controller {
  
  static create(req, res, next) {
    const { title, overview, poster_path, tags, year } = req.body
    Show.create({
      title,
      overview,
      poster_path,
      year,
      tags
    })
      .then(show => {
        res.status(201).json(show)
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    Show.find({ })
      .then(shows => {
        res.status(200).json(shows)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    Show.findById(req.params.id)
      .then(show => {
        if (!show) {
          throw showErr
        } else {
          res.status(200).json(show)
        }
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { title, overview, poster_path, tags, year } = req.body
    Show.findByIdAndUpdate(
      req.params.id,
      { title, overview, poster_path, tags, year },
      { new: true, omitUndefined: true }
    )
      .then(show => {
        if (!show) {
          throw showErr
        } else {
          res.status(200).json(show)
        }
      })
      .catch(next)
  }

  static rate(req, res, next) {
    let newArr = []
    let obj = {
      user: req.body.user,
      score: req.body.score
    }
    Show.findById(req.params.id)
      .then(show => {
        if (!show) {
          throw showErr
        } else if (!show.popularity.length) {
          newArr.push(obj)
        } else if (show.popularity.length) {
          show.popularity.forEach(rate => {
            if (String(rate.user) !== String(req.body.user)) {
              newArr.push(rate)
            }
          })
          newArr.push(obj)
        }
        return Show.findByIdAndUpdate(req.params.id, { $set: { popularity: newArr } })
      })
      .then(show => {
        res.status(200).json(show)
      })
      .catch(next)
  }

  static destroy(req, res, next) {
    Show.findByIdAndDelete(req.params.id)
      .then(show => {
        if (!show) {
          throw showErr
        } else {
          res.status(200).json(show)
        }
      })
      .catch(next)
  }
}