const router = require('express').Router()
const Sequelize = require('sequelize')
const {Table, Table2} = require('../db/models')
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
	Table.findAll()
	.then(function(table){
		res.send(table);
	})
	.catch(next)
})

router.get('/:tablename/:databaseId', (req, res, next) => {
	Table.findAll({
		where:{
			databaseId : req.params.databaseId
		}
	})
	.then(function(tableName){
		res.send(tablename).end()
	})
	.catch(next)
}
           )

router.delete('/:tablename', DeleteTable);