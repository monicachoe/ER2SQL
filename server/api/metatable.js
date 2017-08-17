const router = require('express').Router();
const {Table} = require('../db/models')
const client = require('../db/client');
module.exports = router

router.get('/:tableId', (req, res, next) => {
  var tableId = req.params.tableId;
  Table.findOne({where: {id: tableId}})
    .then((table) => res.json(table))
    .catch(next)
})
router.get('/:tableId/columns', (req,res,next) => {
  var tableId = req.params.tableId
  client.query(`SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '1s'`)
    .then((columns) => 
      res.json(columns.rows)
    )
  })

router.post('/', (req, res, next) => {
  var name  = req.body.tableName;
  var databaseId = req.body.databaseId;
  Table.create({name: name, databaseId: databaseId})
    .then((table) => res.json(table))
    .catch(next)
})

router.delete('/:tableId', (req,res,next) => {
    var tableId = req.params.tableId
    Table.destroy({where: {id: tableId}})
    .then(() => res.status(204).send(`Succesfully deleted table ${tableId} `));
})