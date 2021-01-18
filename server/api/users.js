const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const isAdmin = (req, res, next) =>
  req.user.type === 'Admin'
    ? next()
    : res.send('Only Admins are allowed to alter Users!')

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
router.delete('/:userId', isAdmin, async (req, res, next) => {
  try {
    const deletedProduct = await User.findByPk(req.params.userId)
    await deletedProduct.destroy()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', isAdmin, async (req, res, next) => {
  try {
    const updatedUser = await User.findByPk(req.params.userId)
    await updatedUser.update(req.body)
    res.send(await User.findByPk(req.params.userId, {}))
  } catch (error) {
    next(error)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const createdUser = await User.create(req.body)
    // destructure req.body to pass only what is REQUIRED into database
    if (createdUser) {
      res.json(createdUser)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
