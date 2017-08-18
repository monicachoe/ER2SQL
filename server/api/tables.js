const router = require('express').Router();
const Sequelize = require('sequelize');
const {db, client} = require('../db');
module.exports = router;

// req.body : array of objects
// each object represents one table
// ex/ [{tableName : '1', 
//          fields : {name : {type: String, validations: ...}, 
//                    quantity : {type : integer, validations: ...}}}, 
//      {tableName : '2', 
//          fields : {name : {type: String, validations: ...}, ...}]

router.post('/', (req, res, next) => {
    let table = req.body;
    let tableName = table.tableName.toString();
    let fields = formatFields(table.fields);
    const createdTable = db.define(tableName, fields);
    db.sync()
    .then(()=>res.status(200).send(`OK. Table ${tableName} created.`));
});

router.delete('/:tablename', (req, res, next) => {
    var table = req.params.tablename
    client.query(`DROP TABLE ${table}`, function (err, result) {
      if (err) return next(err);
      res.end();
    });
});

function getSequelizeType(type){
    let d = {'string': Sequelize.STRING, 'text': Sequelize.TEXT, 'float': Sequelize.FLOAT, 'date': Sequelize.DATE, 'boolean': Sequelize.BOOLEAN, 'enum': Sequelize.ENUM, 'array': Sequelize.ARRAY};
    return d[type];
}

function formatFields(fields){
    let keys = Object.keys(fields);
    for (var field of keys){
        let attribute = fields[field]; 
        let seqType = attribute['type']
        fields[field] = Object.assign({}, attribute, {type: getSequelizeType(seqType)})
    }
    return fields;
}