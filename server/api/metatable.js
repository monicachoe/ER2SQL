const router = require('express').Router();
const { Table, Database } = require('../db/models');
const client = require('../db/client');
const utils = require('../../utils');
const {db} = require('../db');
module.exports = router

router.get('/', (req, res, next) => {
  Table.findAll()
    .then(tables => res.json(tables))
    .catch(next);
});

router.post('/', (req, res, next) => {
  let name = req.body.tableName;
  let databaseId = req.body.database.id;
  let databaseName = req.body.database.name;
  let fields = (req.body.fields) ? utils.formatFields(req.body.fields) : null;
  Table.create({ name, databaseId })
    .then(table => table.dataValues)
    .then(table => {
      let tableName = databaseName + table.id.toString();
      const created = db.define(tableName, fields);
      return db.sync();
    })
    .then(()=> res.send(`Ok. Table ${name} created.`))
    .catch(next);
});

router.delete('/:tableId', (req, res, next) => {
  var tableId = req.params.tableId
  Table.destroy({ where: { id: tableId } })
    .then(() => res.status(204).send(`Succesfully deleted table ${tableId} `));
})

router.delete('/:dbId/id/:tableId', (req, res, next) => {
  let tableId = req.params.tableId;
  let dbId = req.params.dbId;
  let user = req.user;
  let tableName;
  Database.findOne({where : {id : dbId, userId : user.id}})
  .then(database => database.dataValues)
  .then(database => {
    tableName = database.name;
    return Table.findOne({where : {id : tableId, databaseId : database.id}})
  })
  .then(table => table.dataValues)
  .then(table => {
    tableName += table.id.toString()+'s';
    return Table.destroy({where : {id : table.id}})
  })
  .then(() => client.query(`DROP TABLE "${tableName}" CASCADE`, function (err, result) {
      if (err) return next(err);
      res.send(`OK. Table ${tableName} deleted.`);
    }))
  .catch(next);
});

router.get('/:tableId', (req, res, next) => {
  let tableId = req.params.tableId;
  Table.findById(tableId)
    .then((table) => res.json(table))
    .catch(next)
});
  
router.get('/:tableId/columns', (req, res, next) => {
  var tableId = req.params.tableId;
  Table.findOne({ where: { id: tableId } })
    .then((table) => 
      Database.findOne({where: {id: table.databaseId}})
    )
    .then((db) =>
        client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '${db.name + tableId + 's'}'`)
    )
    .then((columns) => columns.rows.map((column) => ({[column['column_name']] : column['data_type']}))
    )
    .then((columnNames) => res.json(columnNames))
    .catch(next)
});

router.put('/:tablename', (req, res, next) => {
  var tablename = req.params.tablename;
  var tableName = req.body.name;
  Table.findOne({where: {name: tablename}})
  .then((table) => {console.log("fghsjfbjfh",tableName)
        table.update({name: tableName})})
  .then((table) => {res.json(table)})
  .catch(next)
});