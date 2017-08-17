var pg = require('pg');
var client = new pg.Client('postgres://localhost:5432/er2sql');

client.connect();

module.exports = client;