'use strict'

const router = require('express').Router(),
      Controller = require('../controllers')

// router.use(authentication)
router.post('/', Controller.create)
router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)
router.put('/:id', Controller.update)
router.patch('/:id', Controller.rate)
router.delete('/:id', Controller.destroy)

module.exports = router;