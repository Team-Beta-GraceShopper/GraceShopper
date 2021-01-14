const router = require('express').Router()

const {OrderDetail} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const order = await OrderDetail.findAll()
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await OrderDetail.findByPk(req.params.productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const deletedProduct = await OrderDetail.findByPk(req.params.productId)
    await deletedProduct.destroy()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const updatedProduct = await OrderDetail.findByPk(req.params.productId)
    await updatedProduct.update(req.body)
    res.send(await OrderDetail.findByPk(req.params.robotId, {}))
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
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
