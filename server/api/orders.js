const router = require('express').Router()

const {Order} = require('../db/models')

const isAdmin = (req, res, next) => {
  if (req.user.type === 'Admin') {
    next()
  }
  const err = new Error('Only Admins are allowed to alter User Data!')
  err.status = 401
  return next(err)
}

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/:orderId', isAdmin, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body)
    // destructure req.body to pass only what is REQUIRED into database
    if (order) {
      res.json(order)
    } else {
      console.log('could not create order')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
