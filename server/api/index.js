const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/fields', require('./fields'))
router.use('/tables', require('./tables'))
router.use('/metatable', require('./metatable'))
router.use('/metadatabase', require('./metadatabase'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
