const router = require('express').Router();
const { Table, Database } = require('../db/models')
const client = require('../db/client');
module.exports = router

// .then((db) => {
//   client.query(`SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '${db.name + tableId + 's'}'`)
// })
// .then((columns) => 
//   res.json(columns.rows)
// )
//     return Database.findOne({where: {id: table.databaseId}})

// })
//  .then((db) => res.json(db)
//     )
// .then((db) => res.json(db))
// .catch(next);

router.get('/', (req, res, next) => {
  Table.findAll()
    .then(tables => res.json(tables))
    .catch(next);
});

router.get('/:tableId', (req, res, next) => {
  var tableId = req.params.tableId;
  Table.findOne({ where: { id: tableId } })
    .then((table) => res.json(table))
    .catch(next)
})
router.get('/:tableId/columns', (req, res, next) => {
  var tableId = req.params.tableId;
  Table.findOne({ where: { id: tableId } })
    .then((table) => 
      Database.findOne({where: {id: table.databaseId}})
    )
    .then((db) =>
        client.query(`SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '${db.name + tableId + 's'}'`)
    )
    .then((columns) =>
      columns.rows.map((column) => column['column_name'])
    )
    .then((columnNames) => res.json(columnNames))
    .catch(next)
})
// router.get('/:tableId/columns', (req, res, next) => {
//   var tableId = req.params.tableId
//   Table.findOne({ where: { id: tableId } })
//     .then((table) => res.json(table))
//     .catch(next)
// })

router.post('/', (req, res, next) => {
  var name = req.body.tableName;
  var databaseId = req.body.databaseId;
  Table.create({ name: name, databaseId: databaseId })
    .then((table) => res.json(table))
    .catch(next);
});

router.delete('/:tableId', (req, res, next) => {
  var tableId = req.params.tableId
  Table.destroy({ where: { id: tableId } })
    .then(() => res.status(204).send(`Succesfully deleted table ${tableId} `));
})

// // get each table along with its columns for a particular db.
// router.get('/:databaseId/tables', (req, res, next) => {

// })

//Table will have name and databaseId. In update we are changing 
//name of one of the tables

router.put('/:tableId/:tableName', (req, res, next) => {
  var tableId = req.params.tableId;
  var tableName = req.params.tableName;
  Table.findById(tableId)
  .then((table) => table.update({name: tableName}))
  .then((table) => {res.json(table)})
  .catch(next)
})