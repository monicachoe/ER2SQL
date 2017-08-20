const db = require('./db');
const client = require('./client');

// register models
require('./models')

module.exports = { db, client };
