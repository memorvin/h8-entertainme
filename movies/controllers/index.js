'use strict'
const Movie = require('../models/movie'),
      movieErr = { status: 404, resource: 'Movie'}

module.exports = class Controller {
  
  static create(req, res, next) {
    const { title, overview, poster_path, tags, year } = req.body
    Movie.create({
      title,
      overview,
      poster_path,
      year,
      tags
    })
      .then(movie => {
        res.status(201).json(movie)
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    Movie.find({ })
      .then(movies => {
        res.status(200).json(movies)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    Movie.findById(req.params.id)
      .then(movie => {
        if (!movie) {
          throw movieErr
        } else {
          res.status(200).json(movie)
        }
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { title, overview, poster_path, tags, year } = req.body
    Movie.findByIdAndUpdate(
      req.params.id,
      { title, overview, poster_path, tags, year },
      { new: true, omitUndefined: true }
    )
      .then(movie => {
        if (!movie) {
          throw movieErr
        } else {
          res.status(200).json(movie)
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
    Movie.findById(req.params.id)
      .then(movie => {
        if (!movie) {
          throw movieErr
        } else if (!movie.popularity.length) {
          newArr.push(obj)
        } else if (movie.popularity.length) {
          movie.popularity.forEach(rate => {
            if (String(rate.user) !== String(req.body.user)) {
              newArr.push(rate)
            }
          })
          newArr.push(obj)
        }
        return Movie.findByIdAndUpdate(req.params.id, { $set: { popularity: newArr } })
      })
      .then(movie => {
        res.status(200).json(movie)
      })
      .catch(next)
  }

  static destroy(req, res, next) {
    Movie.findByIdAndDelete(req.params.id)
      .then(movie => {
        if (!movie) {
          throw movieErr
        } else {
          res.status(200).json(movie)
        }
      })
      .catch(next)
  }
}