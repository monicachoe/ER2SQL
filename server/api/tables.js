const router = require('express').Router();
const Sequelize = require('sequelize');
const {db, client} = require('../db');
const { Table, Database } = require('../db/models')
const utils = require('../../utils');
module.exports = router;

router.post('/', (req, res, next) => {
    let table = req.body;
    let tableName = table.tableName.toString();
    let fields = utils.formatFields(table.fields);
    const createdTable = db.define(tableName, fields);
    db.sync()
    .then(()=>res.status(200).send(`OK. Table ${tableName} created.`));
});

router.delete('/:tablename', (req, res, next) => {
    var table = req.params.tablename
    client.query(`DROP TABLE ${table}`, function (err, result) {
      if (err) return next(err);
      res.send(`OK. Table ${table} deleted.`);
    });
});

// router.put('/:tableId', (req, res, next) => {
//   var tableId = req.params.tableId;
//   var tableName = req.body.name;
//   var tablename = Table.findOne({where: {id: tableId}})
//   client.query(`Alter table ${tablename.name+tableId+'s'} to ${tableName}`, function (err, result) {
//     if (err) return next(err);
//         res.end();
//   })
// })

router.put('/:tablenam/:databaseName', (req, res, next) => {
    var body = req.body;
    var tablenam = req.params.tablenam;
    var data = req.params.databaseName;
    Table.findOne({where: {name: tablenam}})
    .then((table) => { 
        console.log("h", table.id, data)
        var ans = data+(table.id).toString()+'s'
        console.log("ans", ans)
        client.query(`ALTER TABLE ${ans} RENAME TO ${body.name}`, function (err, result) {
        if (err) return next(err);
            res.end();
        })
    })
});

