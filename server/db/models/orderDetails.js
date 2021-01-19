const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetail = db.define('orderDetail', {
  // orderId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // },
  // productId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = OrderDetail
