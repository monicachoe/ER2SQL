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
