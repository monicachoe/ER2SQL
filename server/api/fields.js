const router = require('express').Router();
const client = require('../db/client');
const utils = require('./utils');
module.exports = router;

// validate that user logged in
// user is only interfering with their own tables/databases
// Adding a column
// req: {tableName: ..., newField: {name: color, type: Sequelize.STRING}}
router.post('/', (req, res, next) => {
  utils.validateUser(req.query.devId, req.query.apiKey, req.user)
  .then(user => {
  if (user){
    client.query('ALTER TABLE ($1) ADD COLUMN ($2) ($3)', [req.body.tableName, req.body.newField.name, req.body.newField.type], (err, res) => {
      if (err) {
        next(err);
      } else {
        res.sendStatus(200);
      }
    });
  }
})
.catch(next);
});

// Updating column name
// req: {tableName: ..., oldField: 'color', newField: 'shade'}
router.put('/', (req, res, next) => {
  utils.validateUser(req.query.devId, req.query.apiKey, req.user)
  .then(user => {
  if (user){
    client.query('ALTER TABLE ($1) RENAME COLUMN ($2) TO ($3)', [req.body.tableName, req.body.oldField, req.body.newField], (err, res) => {
      if (err){
        next(err);
      } else{
        res.sendStatus(200);
      }
    });
  }
})
.catch(next);
});