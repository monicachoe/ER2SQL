const User = require('./user');
const Table = require('./table');
const Database = require('./database');

Table.belongsTo(Database);
Database.belongsTo(User);
User.hasMany(Database); // userInstance.getDatabases()
Database.hasMany(Table); // databaseInstance.getTables()

module.exports = {
  User,
  Table,
  Database
};
