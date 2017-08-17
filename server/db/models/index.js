const User = require('./User');
const Table = require('./Table');
const Database = require('./Database');

Table.belongsTo(Database);
Database.belongsTo(User);
User.hasMany(Database); // userInstance.getDatabases()
Database.hasMany(Table); // databaseInstance.getTables()

module.exports = {
  User,
  Table,
  Database
};