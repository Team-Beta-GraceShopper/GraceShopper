//const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('product', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Cart
