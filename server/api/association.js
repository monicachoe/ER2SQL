const router = require('express').Router();
const client = require('../db/client');
module.exports = router;

router.post('/', (req, res, next) => {
  let dbname = req.body.dbname;
  let id1 = req.body.id1;
  let id2 = req.body.id2;
  let assocType = req.body.assocType;
  if (assocType==='one to one'){
      client.query(``, function(err, result){
        if(err) console.log(err)
        else res.send(`OK. Table ${id1} is associated to table ${id2} through a ${assocType} association`);
      });
  } else if (assocType==='one to many'){
      client.query(``, function(err, result){
        if(err) console.log(err)
        else res.send(`OK. Table ${id1} is associated to table ${id2} through a ${assocType} association`);
      });
  } else if (assocType==='many to one'){
      client.query(``, function(err, result){
        if(err) console.log(err)
        else res.send(`OK. Table ${id1} is associated to table ${id2} through a ${assocType} association`);
      });
  } else if (assocType==='many to many'){
      client.query(``, function(err, result){
        if(err) console.log(err)
        else res.send(`OK. Table ${id1} is associated to table ${id2} through a ${assocType} association`);
      });
  }
});


// blackblue15s
// blackblue16s
