const User = require('./user');
const Table = require('./table');
const Database = require('./database');

Table.belongsTo(Database);
Database.belongsTo(User);
User.hasMany(Database);
Database.hasMany(Table);

module.exports = {
  User,
  Table,
  Database
};