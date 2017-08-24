const router = require('express').Router();
const { Database, Table } = require('../db/models')
module.exports = router

router.get('/:databaseId', (req, res, next) => {
    let user = req.user || utils.validateApiKey(req.query.devId, req.query.apiKey);
    if (user){
        Database.findById(req.params.databaseId)
        .then((database) => res.status(204).send(`got database ${database.name}`))
        .catch(next)
    }
});

router.post('/', (req, res, next) => {
    let user = req.user || utils.validateApiKey(req.query.devId, req.query.apiKey);
    if (user){
        var name = req.body.name
        var userId = user.id;
        Database.create({ name, userId })
            .then(() => res.status(204).send(`created db with name ${name}, and userId ${userId}`))
            .catch(err => {
                res.status(401).send(`Database ${name} already exists`)
            })
    }
});

router.get('/:databaseId/tables', (req, res, next) => {
    let user = req.user || utils.validateApiKey(req.query.devId, req.query.apiKey);
    if (user){
        Database.findById(req.params.databaseId)
        .then(database => database.getTables())
        .then(tables => res.json(tables))
        .catch(next)
    }
});