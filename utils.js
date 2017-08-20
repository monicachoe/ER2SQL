const Sequelize = require('sequelize');

function toSequelize(type){
    let d = {'String': Sequelize.STRING, 'Text': Sequelize.TEXT, 'Float': Sequelize.FLOAT, 'Date': Sequelize.DATE, 'Boolean': Sequelize.BOOLEAN, 'Enum': Sequelize.ENUM, 'Array': Sequelize.ARRAY};
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