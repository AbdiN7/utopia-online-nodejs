const Sequelize = require('sequelize')
const db = require('../dao/db')

module.exports = db.sequelize.define(
  'user',
  {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userFirstName: {
      type: Sequelize.STRING,
    },
    userLastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    cardNumber: {
      type: Sequelize.STRING,
    },
    // created: {
    //   type: Sequelize.DATE,
    //   defaultValue: Sequelize.NOW
    // }
  },
  {
    freezeTableName: true,
    tableName: 'user',
    timestamps: false
  }
)
