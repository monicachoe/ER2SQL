const router = require('express').Router();
const client = require('../db/client');
const { Table, Database } = require('../db/models');
module.exports = router;

router.post('/', (req, res, next) => {
  let uDb = req.body.database;
  let usrc = req.body.src;
  let utarget = req.body.target;
  let assocType = req.body.assocType;
  let fkName = req.body.fkName;
  let user = req.user;
  let db, dbName, src, target, srcName, targetName, tableId;

  Database.findOne({where : {id : uDb.id, userId : user.id}})
  .then(database => database.dataValues)
  .then(database => {
    dbName = database.name;
    db = database;
    return Table.findOne({where : {id : usrc.tableId, databaseId : db.id}})
  })
  .then(srcTable => srcTable.dataValues)
  .then(srcTable => {
    src = srcTable;
    srcName = db.name+srcTable.id+'s';
    return Table.findOne({where : {id : utarget.tableId, databaseId : db.id}})
  })
  .then(targetTable => targetTable.dataValues)
  .then(targetTable => {
    target = targetTable;
    targetName = db.name+targetTable.id+'s';
    if (assocType === 'many to many'){
      return Table.findOne({where : {name : src.name+'_'+target.name, databaseId : db.id}})
    }
  })
  .then(joinTable => (assocType==='many to many') ? tableId = joinTable.dataValues.id : null)
  .then(() => {
    if (assocType === 'one to one'){
      fkName = (fkName === '') ? src.name + '_id' : fkName;
      let constraintName = 'fk_' + src.name;
      return client.query(`ALTER TABLE "${targetName}"
                    ADD COLUMN "${fkName}" INTEGER UNIQUE,
                    ADD CONSTRAINT "${constraintName}"
                    FOREIGN KEY("${fkName}")
                    REFERENCES "${srcName}"(id)`)
    }
    else if (assocType === 'one to many'){
      fkName = (fkName === '') ? src.name + '_id' : fkName;
      let constraintName = 'fk_' + src.name;
      return client.query(`ALTER TABLE "${targetName}"
                    ADD COLUMN "${fkName}" INTEGER,
                    ADD CONSTRAINT "${constraintName}"
                    FOREIGN KEY("${fkName}")
                    REFERENCES "${srcName}"(id)`)
    }
    else if (assocType === 'many to one'){
      fkName = (fkName === '') ? target.name + '_id' : fkName;
      let constraintName = 'fk_' + target.name;
      return client.query(`ALTER TABLE "${srcName}"
                    ADD COLUMN "${fkName}" INTEGER,
                    ADD CONSTRAINT "${constraintName}"
                    FOREIGN KEY("${fkName}")
                    REFERENCES "${targetName}"(id)`)
    }
    else if (assocType==='many to many'){
      let fkName1 = src.name + '_id';
      let fkName2 = target.name + '_id';
      return client.query(`DROP TABLE "${dbName}${tableId}s";
                    create table "${dbName}${tableId}s"
                   ("${fkName1}" INTEGER, "${fkName2}" INTEGER,
                   FOREIGN KEY("${fkName1}")
                   REFERENCES "${srcName}"(id),
                   FOREIGN KEY("${fkName2}")
                   REFERENCES "${targetName}"(id),
                   PRIMARY KEY ("${fkName1}","${fkName2}"))`)
    }          
  })
  .then(result => {
      res.send("association succeeded");
  })
  .catch(next);
});