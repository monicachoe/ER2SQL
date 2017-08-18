const router = require('express').Router();
const client = require('../db/client');
module.exports = router;

router.post('/', (req, res, next) => {
  console.log('hello, youve hit the proper post route');
  let dbname = req.body.dbname;
  let id1 = req.body.id1;
  let id2 = req.body.id2;
  let table1 = dbname+id1.toString();
  let table2 = dbname+id2.toString();
  let assocType = req.body.assocType;
  if (assocType==='one to one'){
      client.query(`ALTER TABLE ${table1}s ADD ${table2}id int`,function(err, result){
        if(err) console.log(err)
        else console.log("i've altered table1 successfully" )
      })
      .then(() => client.query(`ALTER TABLE ${table1}s ADD FOREIGN KEY (${table2}id) REFERENCES ${table2}s(id)`, function(err, result){
        if (err) console.log(err)
        else res.send(`OK. Table ${id1} is associated to table ${id2} through a ${assocType} association`);
      }))
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

// one to one
// ALTER TABLE blackblue16s
// ADD blackblue7test int;
// ALTER TABLE blackblue16s
// ADD FOREIGN KEY (blackblue7test) REFERENCES blackblue17s(id);

// one to many

// many to one

// many to many
// join table??
// create table movie_category_junction
// (
//   movie_id int,
//   category_id int,
//   CONSTRAINT movie_cat_pk PRIMARY KEY (movie_id, category_id),
//   CONSTRAINT FK_movie 
//       FOREIGN KEY (movie_id) REFERENCES movie (movie_id),
//   CONSTRAINT FK_category 
//       FOREIGN KEY (category_id) REFERENCES category (category_id)
// );