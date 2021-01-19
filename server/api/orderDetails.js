const router = require('express').Router()

const {OrderDetail} = require('../db/models')
const {Order} = require('../db/models')

const isAdmin = (req, res, next) =>
  req.user.type === 'Admin'
    ? next()
    : res.send('Only Admins are allowed to alter Order Data!')

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const order = await OrderDetail.findAll({include: Order})
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.get('/:orderDetailsId', isAdmin, async (req, res, next) => {
  try {
    const orderDetail = await OrderDetail.findByPk(req.params.orderDetailsId)
    res.json(orderDetail)
  } catch (error) {
    next(error)
  }
})
// get all order details associated with a specific order:
router.get('/orders/:orderId', isAdmin, async (req, res, next) => {
  try {
    const orderDetail = await OrderDetail.findAll({
      where: {orderId: req.params.orderId}
    })
    res.json(orderDetail)
  } catch (error) {
    next(error)
  }
})

router.delete('/:orderDetailsId', isAdmin, async (req, res, next) => {
  try {
    const deletedOrderDetail = await OrderDetail.findByPk(
      req.params.orderDetailsId
    )
    await deletedOrderDetail.destroy()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:orderDetailsId', isAdmin, async (req, res, next) => {
  try {
    const updatedOrderDetail = await OrderDetail.findByPk(
      req.params.orderDetailsId
    )
    await updatedOrderDetail.update(req.body)
    res.json(updatedOrderDetail)
  } catch (error) {
    next(error)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const createdOrderDetail = await OrderDetail.create(req.body)
    // destructure req.body to pass only what is REQUIRED into database
    if (createdOrderDetail) {
      res.json(createdOrderDetail)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
