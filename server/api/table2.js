const router = require('express').Router()
const Sequelize = require('sequelize')
const {Table2} = require('../db/models')
const client  = require('../db/client');
module.exports = router

function DeleteTable(req, res, next) {
    var table = req.params.tablename
    client.query(`DROP TABLE ${table}`, function (err, result) {
      if (err) return next(err);
      res.end(); // pass errors to Express
    })
}

router.get('/', (req, res, next) => {
	Table2.findAll()
	.then(function(table){
		res.send(table);
	})
	.catch(next)
})

router.get('/:tablename/:tablename', DeleteTable);