const router = require('express').Router()
module.exports = router

router.use('/table2', require('./table2'))
router.use('/table', require('./table'))
router.use('/users', require('./users'))
router.use('/tables', require('./tables')) // virutal tables
router.use('/fields', require('./fields')) // for the virtual tables
router.use('/metatable', require('./metatable')) // OUR table to hold table information 
router.use('/metadatabase', require('./metadatabase')) // OUR table to hold database information


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});