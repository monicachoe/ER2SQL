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

module.exports = {
    formatFields
};