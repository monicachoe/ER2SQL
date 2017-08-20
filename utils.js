const Sequelize = require('sequelize');

function getSequelizeType(type){
    let d = {'string': Sequelize.STRING, 'text': Sequelize.TEXT, 'float': Sequelize.FLOAT, 'date': Sequelize.DATE, 'boolean': Sequelize.BOOLEAN, 'enum': Sequelize.ENUM, 'array': Sequelize.ARRAY};
    return d[type];
}

function formatFields(fields){
    let keys = Object.keys(fields);
    for (var field of keys){
        let attribute = fields[field]; 
        let seqType = attribute['type']
        fields[field] = Object.assign({}, attribute, {type: getSequelizeType(seqType)})
    }
    return fields;
}

module.exports = {
    getSequelizeType,
    formatFields
};