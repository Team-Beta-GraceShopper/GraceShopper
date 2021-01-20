const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    // unique: false,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  orderTotal: {
    type: Sequelize.INTEGER,
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
