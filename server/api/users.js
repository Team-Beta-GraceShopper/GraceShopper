const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const isAdmin = (req, res, next) => {
  if (req.user.type === 'Admin') {
    next()
  }
  const err = new Error('Only Admins are allowed to alter User Data!')
  err.status = 401
  return next(err)
}

const isUser = (req, res, next) => {
  if (req.params.userId === req.user.id) {
    next()
  }
  const err = new Error(
    'Users can only access data associated with their account'
  )
  err.status = 401
  return next(err)
}

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

router.get('/:userId', isUser, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', isUser, async (req, res, next) => {
  try {
    const updatedUser = await User.findByPk(req.params.userId)
    await updatedUser.update(req.body)
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})
