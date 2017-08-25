const crypto = require('crypto');
const {Table, Database, User} = require('../db/models');
const Sequelize = require('sequelize');

function toSequelize(type){
    let d = {'string': Sequelize.STRING, 'text': Sequelize.TEXT, 'integer': Sequelize.INTEGER,'float': Sequelize.FLOAT, 'date': Sequelize.DATE, 'boolean': Sequelize.BOOLEAN, 'enum': Sequelize.ENUM, 'array': Sequelize.ARRAY};
    return d[type];
}

function formatFields(fields){
    let keys = Object.keys(fields);
    for (var field of keys){
        let attribute = fields[field]; 
        let seqType = attribute['type']
        fields[field] = Object.assign({}, attribute, {type: toSequelize(seqType)})
    }
    return fields;
}
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

// // checking hashed apikey!
// function validateUser(devId, hashed, reqUser){
// console.log('hashedApiKey: ', crypto.createHash('md5').update(devId).update(hashed).update(new Date().toISOString().slice(0,19)).digest('hex'));    
//     return User.findOne({where : devId})
//     .then(user => user.dataValues)
//     .then(user => crypto.createHash('md5').update(user.devId).update(user.apiKey).update(new Date().toISOString().slice(0,19)).digest('hex')===hashed ? user : null)
//     .then(res => res || reqUser);
// }

// // checking unhashed apikey!!
// if user is not found --> throws Error Cannot read property 'dataValues' of null b/c line 55 
function validateUser(devId, hashed, reqUser){
    return User.findOne({where : {devId}})
    .then(user => user ? user.dataValues.apiKey === hashed ? user : null : reqUser)
}

function cleanString(str){
    return str.replace(/[^a-zA-Z0-9_-]/g, "");
}

module.exports = {
    formatFields,
    validateDatabase,
    validateTableById,
    validateTableByName,
    formatTableName,
    formatJoinTableName,
    validateUser,
    cleanString
};