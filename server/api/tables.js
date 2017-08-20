const router = require('express').Router();
const Sequelize = require('sequelize');
const {db, client} = require('../db');
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