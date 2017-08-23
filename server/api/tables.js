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

router.put('/:tablenam/:databaseName/field', (req, res, next) => {
    var tablenam = req.params.tablenam;
    var data = req.params.databaseName;
    // var colName = req.params.colName;
    // var arr = Object.keys(req.body.newfields);
    // var col;
    // for(var i = 0; i < arr.length; i++){
    //     if(!req.body.oldfields[arr[i]]){
    //         col = arr[i]
    //     }
    // }
    console.log("hey", tablenam, "datata", data)
    Table.findOne({where: {name: tablenam}})
    .then((table) => { 
        console.log("h", table)
        var ans = data+(table.id).toString()+'s'
        console.log("ans", ans, "bbb", ans, "body", req.body.old)

        client.query(`ALTER TABLE ${ans} RENAME ${req.body.old} TO ${req.body.new}`, function (err, result) {
            if (err) return next(err);
            res.end();
        })
    })
})

