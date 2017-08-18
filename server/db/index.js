const db = require('./db')
const client = require('./client')
require('./models');

// register models
require('./models')

module.exports = { db, client };
