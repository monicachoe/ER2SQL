<<<<<<< HEAD
=======
// var pg = require('pg');
// var client = new pg.Client('postgres://localhost:5432/er2sql');

// client.connect();

// module.exports = client;
>>>>>>> 84197e2daf6fadbbe769be5877597d8c670bca03
const pg = require('pg')

const client = new pg.Client({
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORT,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME
});

client.connect();

module.exports = client;
<<<<<<< HEAD

// var pg = require('pg');
// var client = new pg.Client('postgres://localhost:5432/er2sql');

// client.connect();

// module.exports = client;
=======
>>>>>>> 84197e2daf6fadbbe769be5877597d8c670bca03
