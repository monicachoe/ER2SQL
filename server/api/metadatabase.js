const router = require('express').Router();
const { Database, Table } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    res.send('u got it!')
})
router.get('/:databaseId', (req, res, next) => {
    var databaseId = req.params.databaseId
    Database.findById(databaseId)
        .then((database) => res.status(204).send(`got database ${database.name}`))
        .catch(next)
})

router.post('/', (req, res, next) => {
    var name = req.body.name
    var userId = req.body.userId
    Database.create({ name, userId })
        .then(() => res.status(204).send(`created db with name ${name}, and userId ${userId}`))
        .catch(next)
})

router.get('/:databaseId/tables', (req, res, next) => {
    var databaseId = req.params.databaseId
    Table.findAll({ where: { databaseId } })
        .then((tables) => res.json(tables))
        .catch(next)
})
