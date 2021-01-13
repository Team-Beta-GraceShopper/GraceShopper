const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderUserId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  orderTotal: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0
    }
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Order
