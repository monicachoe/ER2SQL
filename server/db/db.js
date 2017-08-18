const Sequelize = require('sequelize')

const db = new Sequelize( process.env.RDS_DB_NAME, process.env.RDS_USERNAME, process.env.RDS_PASSWORD,
  {
    host: process.env.RDS_HOSTNAME,
    dialect: 'postgres',
    port: process.env.RDS_PORT,
    logging: false
  }
)
<<<<<<< HEAD
module.exports = db;
=======
module.exports = db
>>>>>>> 84197e2daf6fadbbe769be5877597d8c670bca03

// const Sequelize = require('sequelize')
// const db = new Sequelize(
//   process.env.DATABASE_URL || 'postgres://localhost:5432/er2sql', {
//     logging: false
//   }
// )
<<<<<<< HEAD

// module.exports = db;

=======

// module.exports = db;
>>>>>>> 84197e2daf6fadbbe769be5877597d8c670bca03
