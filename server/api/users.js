const router = require('express').Router()
const {User, Database} = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/databases', (req, res, next) => {
  User.findById(req.user.id)
  .then(user => user.getDatabases())
  .then(databases => res.send(databases))
  .catch(err => console.log(err));
});

router.post('/:userId/database/:dbName', (req, res, next) => {
  Database.findOrCreate( {where: {
    userId: req.params.userId,
    name: req.params.dbName
  }})
  .spread( (db, created) => {
    if (!created){
      res.status(401).send(`Database ${req.params.dbName} already exists`)
    }
    else {
      console.log('createdDB: ', db);
      res.send(db);
    }
  })
  .catch(next);
});