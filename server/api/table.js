const router = require('express').Router();
const {client} = require('../db');
const utils = require('./utils');

router.put('/:dbName/id/:tableId/fields', (req, res, next) => {
    let tableName = req.params.dbName + req.params.tableId + 's';
    client.query(`ALTER TABLE ${tableName} RENAME ${req.body.old} TO ${req.body.new}`)
    .then( () => res.send('Rename table fields successfull'))
    .catch(next);
});

module.exports = router;