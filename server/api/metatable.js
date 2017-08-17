const router = require('express').Router();
const {Table} = require('../db/models')
module.exports = router

router.get('/:tableId', (req, res, next) => {
  var tableId = req.params.tableId
  Table.findOne({where: {id: tableId}})
    .then((table) => res.json(table))
    .catch(next)
})

router.post('/', (req, res, next) => {
  var name  = req.body.tableName
  var databaseId = req.body.databaseId
  Table.create({name: name, databaseId: databaseId})
    .then((table) => res.status(204).json(table.id))
    .catch(next)
})

router.delete('/:tableId', (req,res,next) => {
    var tableId = req.params.tableId
    Table.destroy({where: {id: tableId}})
    .then(() => res.status(204).send(`Succesfully deleted table ${tableId} `))
})