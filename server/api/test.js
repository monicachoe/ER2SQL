var client = require('../db').client;
var router = require('express').Router();


router.get('/', (req, res, next) => {
  console.log("In test");
  client.query('CREATE TABLE company (name text not null, age int not null)')
  .then(result => {
    console.log("table created on AWS RDS", result);
    res.send(result);
  })
  .catch(next);
})

module.exports = router;

