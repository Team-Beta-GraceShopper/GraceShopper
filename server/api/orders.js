const router = require('express').Router()

const {Order} = require('../db/models')

const isAdmin = (req, res, next) =>
  req.user.type === 'Admin'
    ? next()
    : res.send('Only Admins are allowed to alter Order Data!')

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

// router.get('/:orderDetailsId', async (req, res, next) => {
//   try {
//     const orderDetail = await OrderDetail.findByPk(req.params.orderDetailsId)
//     res.json(orderDetail)
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/:productId', async (req, res, next) => {
//   try {
//     const deletedProduct = await OrderDetail.findByPk(req.params.productId)
//     await deletedProduct.destroy()
//     res.status(204).end()
//   } catch (error) {
//     next(error)
//   }
// })

// router.put('/:orderDetailsId', async (req, res, next) => {
//   try {
//     const updatedOrderDetail = await OrderDetail.findByPk(
//       req.params.orderDetailsId
//     )
//     await updatedOrderDetail.update(req.body)
//     res.json(updatedOrderDetail)
//   } catch (error) {
//     next(error)
//   }
// })
