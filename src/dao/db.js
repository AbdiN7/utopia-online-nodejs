const Sequelize = require('sequelize')
const db = {}
const CONFIG = require('../../config');
const sequelize = new Sequelize(CONFIG.db_name,
                                CONFIG.db_user,
                                CONFIG.db_password,
{
  host: CONFIG.db_host,
  dialect: CONFIG.db_dialect,
  operatorsAliases: false,
  tableName: 'user',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
