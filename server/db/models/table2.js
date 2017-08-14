const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')


const Table2 = db.define('table2', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	age: {
		type: Sequelize.INTEGER
	}
})



module.exports = Table2;