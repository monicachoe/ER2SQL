const {Table, Database} = require('../db/models');

function validateDatabase(dbId, userId){
    return Database.findOne({where : {id : dbId, userId}})
    .then(database => database.dataValues);
}

function validateTableById(tableId, databaseId){
    return Table.findOne({where : {id : tableId, databaseId}})
    .then(table => table.dataValues);
}

function validateTableByName(tableName, databaseId){
        return Table.findOne({where : {name : tableName, databaseId}})
    .then(table => table.dataValues);
}

function formatTableName(db, table){
    return db.name+table.id+'s';
}

function formatJoinTableName(src, target){
    return src.name+'_'+target.name;
}

module.exports = {
    validateDatabase,
    validateTableById,
    validateTableByName,
    formatTableName,
    formatJoinTableName
};