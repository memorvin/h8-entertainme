'use strict'

const router = require('express').Router(),
      Controller = require('../controllers')
      // { authentication } = require('../middlewares/auth')

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get('/:id', Controller.findOne)
router.patch('/:id/movie', Controller.addMovie)
router.patch('/:id/show', Controller.addShow)

module.exports = router;