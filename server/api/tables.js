const router = require('express').Router();
const Sequelize = require('sequelize');
const {db, client} = require('../db');
const { Table, Database } = require('../db/models')
const utils = require('../../utils');
module.exports = router;

// Connect metatable and table so frontend only hits one route
router.post('/', (req, res, next) => {
    let table = req.body;
    let tableName = table.tableName.toString();
    let fields = utils.formatFields(table.fields);
    const createdTable = db.define(tableName, fields);
    db.sync()
    .then(()=>res.status(200).send(`OK. Table ${tableName} created.`))
    .catch(err => next(err));
});


router.delete('/:tablename', (req, res, next) => {
    var table = req.params.tablename
    client.query(`DROP TABLE "${table}" CASCADE`, function (err, result) {
      if (err) return next(err);
      res.send(`OK. Table ${table} deleted.`);
    });
});


router.put('/:tablename/:databaseName', (req, res, next) => {
    var body = req.body;
    var tablename = req.params.tablename;
    var data = req.params.databaseName;
    Table.findOne({where: {name: tablename}})
    .then((table) => {
        var ans = data+(table.id).toString()+'s'
        client.query(`ALTER TABLE ${ans} RENAME TO ${body.name}`, function (err, result) {
        if (err) return next(err);
            res.end();
        })
    })
});

router.put('/:tablenam/:databaseName/field', (req, res, next) => {
    var tablenam = req.params.tablenam;
    var data = req.params.databaseName;
    Table.findOne({where: {name: tablenam}})
    .then((table) => { 
        console.log("h", table)
        var ans = data+(table.id).toString()+'s'

    client.query(`ALTER TABLE ${ans} RENAME ${req.body.old} TO ${req.body.new}`, function (err, result) {
        if (err) return next(err);
            res.end();
        })
    })
})

