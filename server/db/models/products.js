//const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.ENUM('Category1', 'Category2', 'Category3'),
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  productQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  inStock: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  size: {
    type: Sequelize.ENUM('xsmall', 'small', 'medium', 'large', 'xlarge'),
    allowNull: false
  }
})

module.exports = Product
