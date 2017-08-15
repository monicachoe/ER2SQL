var client = require('../db').client;
var router = require('express').Router();
const pgtools = require('pgtools');

const config = {
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  host: process.env.RDS_HOSTNAME
}

router.get('/', (req, res, next) => {
  console.log("In test");
  client.query('CREATE TABLE company (name text not null, age int not null)')
  .then(result => {
    console.log("table created on AWS RDS", result);
    res.send(result);
  })
  .catch(next);
});

router.get('/create', (req, res, next) => {
  console.log("creating database for a user");
  pgtools.createdb(config, 'test-db-aws')
  .then( (result) => {
    console.log("Created db: ", result)
    res.send(result)
  })
  .catch(next);

})

module.exports = router;

