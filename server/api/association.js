const router = require('express').Router();
const client = require('../db/client');
module.exports = router;

router.post('/', (req, res, next) => {
  let dbName = req.body.dbName;
  let src = req.body.src;
  let target = req.body.target;
  let srcName = dbName+src.tableId+'s';
  let targetName = dbName+target.tableId+'s';
  let assocType = req.body.assocType;
  let fkName = req.body.fkName;
  let tableId = req.body.tableId;

  if (assocType === 'one to one'){
    fkName = (fkName === '') ? src.name + '_id' : fkName;
    let constraintName = 'fk_' + src.name;
    client.query(`ALTER TABLE "${targetName}"
                  ADD COLUMN "${fkName}" INTEGER UNIQUE,
                  ADD CONSTRAINT "${constraintName}"
                  FOREIGN KEY("${fkName}")
                  REFERENCES "${srcName}"(id)`)
    .then(result => {
      res.send("1:1 succeeded");
    })
    .catch(next);
  }
  else if (assocType === 'one to many'){
    fkName = (fkName === '') ? src.name + '_id' : fkName;
    let constraintName = 'fk_' + src.name;
    client.query(`ALTER TABLE "${targetName}"
                  ADD COLUMN "${fkName}" INTEGER,
                  ADD CONSTRAINT "${constraintName}"
                  FOREIGN KEY("${fkName}")
                  REFERENCES "${srcName}"(id)`)
    .then(result => {
      res.send("1:n succeeded");
    })
    .catch(next);
  }
  else if (assocType === 'many to one'){
    fkName = (fkName === '') ? target.name + '_id' : fkName;
    let constraintName = 'fk_' + target.name;
    client.query(`ALTER TABLE "${srcName}"
                  ADD COLUMN "${fkName}" INTEGER,
                  ADD CONSTRAINT "${constraintName}"
                  FOREIGN KEY("${fkName}")
                  REFERENCES "${targetName}"(id)`)
    .then(result => {
      res.send("n:1 succeeded");
    })
    .catch(next);
  }
  else if (assocType==='many to many'){
    let fkName1 = src.name + '_id';
    let fkName2 = target.name + '_id';
    client.query(`create table "${dbName}${tableId}s"
                  ("${fkName1}" INTEGER, "${fkName2}" INTEGER,
                  FOREIGN KEY("${fkName1}")
                  REFERENCES "${srcName}"(id),
                  FOREIGN KEY("${fkName2}")
                  REFERENCES "${targetName}"(id),
                  PRIMARY KEY ("${fkName1}","${fkName2}"))`)
    .then(result => res.send({tableName : `${srcName}_${targetName}`, column1 : `${fkName1}`, column2 : `${fkName2}`}))
  }
});
