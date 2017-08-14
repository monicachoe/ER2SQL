var pg = require('pg');
var client = new pg.Client('postgres://localhost/Capstone');

client.connect()

module.exports = client;