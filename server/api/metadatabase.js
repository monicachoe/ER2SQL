const router = require('express').Router();
const { Database, Table } = require('../db/models')
module.exports = router

router.get('/:databaseId', (req, res, next) => {
    Database.findById(req.params.databaseId)
    .then((database) => res.status(204).send(`got database ${database.name}`))
    .catch(next)
});

router.post('/', (req, res, next) => {
    var name = req.body.name
    var userId = req.body.userId
    Database.create({ name, userId })
        .then(() => res.status(204).send(`created db with name ${name}, and userId ${userId}`))
        .catch(err => {
            res.status(401).send(`Database ${name} already exists`)
        })
});

router.get('/:databaseId/tables', (req, res, next) => {
    Database.findById(req.params.databaseId)
    .then(database => database.getTables())
    .then(tables => res.json(tables))
    .catch(next)
});