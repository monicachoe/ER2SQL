const Sequelize = require('sequelize')
const pg = require('pg')

const conString = process.env.DATABASE_URL || 'postgres://localhost:5432/er2sql'; 
const db = new Sequelize(
  conString, {
    logging: false
  }
)

const client = new pg.Client(conString);
client.connect();

module.exports = {db, client};
