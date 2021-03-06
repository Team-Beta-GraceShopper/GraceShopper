const router = require('express').Router()

const {Product} = require('../db/models')

const isAdmin = (req, res, next) => {
  if (req.user.type === 'Admin') {
    next()
  }
  const err = new Error('Only Admins are allowed to alter User Data!')
  err.status = 401
  return next(err)
}

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', isAdmin, async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByPk(req.params.productId)
    await deletedProduct.destroy()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByPk(req.params.productId)
    await updatedProduct.update(req.body)
    res.send(await Product.findByPk(req.params.robotId, {}))
  } catch (error) {
    next(error)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const createdProduct = await Product.create(req.body)
    // destructure req.body to pass only what is REQUIRED into database
    if (createdProduct) {
      res.json(createdProduct)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
