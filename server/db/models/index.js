const User = require('./user')
const Cart = require('./cart')
const Product = require('./product')
const OrderDetail = require('./orderDetails')
const Order = require('./orders')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
// Order.belongsTo(User)
// User.hasMany(Order)

// OrderDetail.belongsTo(Order)
// OrderDetail.hasMany(Product)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Cart,
  Product,
  OrderDetail,
  Order
}
