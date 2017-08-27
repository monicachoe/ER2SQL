const router = require('express').Router();
const utils = require('./utils');
const {User, Database} = require('../db/models');

module.exports = router

router.get('/', (req, res, next) => {
  utils.validateUser(req.query.devId, req.query.apiKey, req.user)
  .then(user => {
    if (user){    
      User.findAll({
        attributes: ['id', 'email']
      })
      .then(users => res.json(users))
      .catch(next)
    }
  })
  .catch(next);
})

router.get('/databases', (req, res, next) => {
  utils.validateUser(req.query.devId, req.query.apiKey, req.user)
  .then(user => {
    if (user){
    User.findById(user.id)
    .then(user => user.getDatabases())
    .then(databases => res.send(databases))
    .catch(err => console.log(err));
    }
  })
  .catch(next);
});

router.post('/:userId/database/:dbName', (req, res, next) => {
  utils.validateUser(req.query.devId, req.query.apiKey, req.user)
  .then(user => {
    if (user){
      Database.findOrCreate( {where: {
        userId: req.params.userId,
        name: utils.cleanString(req.params.dbName)
      }})
      .spread( (db, created) => {
        if (!created){
          res.status(401).send(`Database ${req.params.dbName} already exists`)
        }
        else {
          res.send(db);
        }
      })
      .catch(next);
    }
  })
  .catch(next);
});