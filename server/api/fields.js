const router = require('express').Router();
const client = require('../db/client');
module.exports = router;

// req: {tableName: ..., oldField: ..., newField: ...}
// Updating column name
router.put('/', (req, res, next) => {
    client.query('ALTER TABLE ($1) RENAME COLUMN ($2) TO ($3)', [req.body.tableName, req.body.oldField, req.body.newField])
});