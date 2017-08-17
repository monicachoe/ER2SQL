const router = require('express').Router()
const {User, Database} = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

//POST: Route to create database by each user.
router.post('/:userId/:dbName', (req, res, next) => {
  console.log('route: ', req.params.userId, req.params.dbName);
  Database.findOrCreate( {where: {
    userId: req.params.userId,
    name: req.params.dbName
  }})
  .spread( (db, created) => {
    if (!created){
      res.send('Database ', req.params.dbName, ' already exists ');
    }
    else {
      console.log(db);
      res.send(db);
    }
  })
  .catch(next);
});

//GET: Route to get databases of logged-in user
// /api/users/1/databases
// OR
// /api/databases?userId=1
router.get('/:userId/databases', (req, res, next) => {
  Database.findAll({where: {
    userId: req.params.userId
  }})
  .then( (databases) => {
    res.send(databases);
  })
  .catch(next);
});
