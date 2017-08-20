const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Table = db.define('table', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Table;
