var pg = require('pg');
var client = new pg.Client('postgres://localhost/er2sql');

client.connect();

module.exports = client;