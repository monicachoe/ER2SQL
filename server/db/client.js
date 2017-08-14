const pg = require('pg')

const conString = process.env.DATABASE_URL || 'postgres://localhost:5432/er2sql'; 
const client = new pg.Client(conString);
client.connect();

module.exports = client;