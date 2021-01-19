const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
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

  //   myArrayField: {
  //     type: DataTypes.STRING,
  //     get: function() {
  //         return JSON.parse(this.getDataValue('myArrayField'));
  //     },
  //     set: function(val) {
  //         return this.setDataValue('myArrayField', JSON.stringify(val));
  //     }
  // }
})

module.exports = Order
