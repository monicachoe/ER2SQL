const router = require('express').Router();
const client = require('../db').client;
const fs = require('fs');
const path = require('path');

router.post('/upload/:tableName', (req, res, next) => {
  let data = req.body;
  console.log(data.data);
  console.log(path.join(__dirname, `/data/${req.params.tableName}.csv`));

  fs.writeFile(path.join(__dirname, `../data/${req.params.tableName}.csv`), data.data, (err, data) => {
    if (err) {
     console.log(err);
     res.sendStatus(404);
    }
    else {

    }
  })

})

module.exports = router;
/*
  router.get('/add', (req, res, next) => {
    client.query('ALTER TABLE tweets add num_char integer')
    .then(result => {
      console.log("alter", result);
      return client.query('CREATE TABLE tempTable (tweet_id numeric, num_char numeric)')
    })
    .then((result) => {
      console.log("create temp",result);
      //return client.query('COPY tempTable FROM ($1)', path.resolve("./data.csv"))
        var stream = client.query(copyFrom('COPY tempTable FROM STDIN CSV'));
        var fileStream = fs.createReadStream(path.resolve("./data.csv"));
        fileStream.on('error', (err) => console.log("error", err));
        stream.on('end', (err, res) => {
          if (err){
            console.log(err);
          }
          else {
            console.log("copy", res);
            client.query('UPDATE tweets SET num_char= tempTable.num_char FROM tempTable where tweets.id = tempTable.tweet_id')
            .then(updateResult => console.log('update', updateResult));
          }
        });
        fileStream.pipe(stream);
    })
  });
  return router;
*/
