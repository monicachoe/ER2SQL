const router = require('express').Router();
const Client = require('pg').Client;
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/er2sql';
module.exports = router;

let client = new Client(connectionString);

// req: {tableName: ..., oldField: ..., newField: ...}
// Updating column name
router.put('/', (req, res, next) => {

});

pg.connect()

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