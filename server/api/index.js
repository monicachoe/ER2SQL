const router = require('express').Router()
module.exports = router

router.use('/table2', require('./table2'))
router.use('/table', require('./table'))
router.use('/users', require('./users'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
