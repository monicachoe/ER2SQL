const db = require('./db')
const client = require('./client')
require('./models');

<<<<<<< HEAD
module.exports = {db, client};
=======
// register models
require('./models')

module.exports = { db };
>>>>>>> 6047310d061a392257127b12ea0db3b9e727d59b
