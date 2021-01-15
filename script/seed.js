'use strict'

const db = require('../server/db')
const {
  User,
  Product
  // OrderDetail,
  // Order
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const products = await Promise.all([
    Product.create({
      name: 'Christmas Sweater',
      category: 'sweater',
      price: 10000,
      imageUrl:
        'https://www.bowwowsbest.com/v/vspfiles/photos/DOD-57243-2.jpg?v-cache=1539333998',
      productQuantity: 5,
      inStock: true,
      description: 'wonderful sweater for the festive seasons',
      size: 'small'
    }),
    Product.create({
      name: 'Ugly Sweater',
      category: 'sweater',
      price: 15000,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0512/7721/products/Red_Hearts_1024x1024.jpg?v=1602266507',
      productQuantity: 10,
      inStock: true,
      description: 'the ugliest of sweaters for that ugly sweater party',
      size: 'large'
    }),
    Product.create({
      name: 'Birthday Dress',
      category: 'dress',
      price: 20000,
      imageUrl:
        'https://s7d2.scene7.com/is/image/PetSmart/5294347?$pdp-placeholder-desktop$',
      productQuantity: 3,
      inStock: true,
      description: 'A wonderfur birthday dress for that special day',
      size: 'xsmall'
    }),
    Product.create({
      name: 'Formal Dress',
      category: 'dress',
      price: 30000,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/717Y3LiaoKL._AC_SL1200_.jpg',
      productQuantity: 10,
      inStock: true,
      description: 'A elegant dress for those long walks at the park',
      size: 'small'
    })
  ])

  // const categories = await Promise.all([
  //   Category.create({
  //     categoryName: 'sweater',
  //     imageUrl:
  //       'https://s7d2.scene7.com/is/image/PetSmart/5294347?$pdp-placeholder-desktop$',
  //     active: true
  //   }),
  //   Category.create({
  //     categoryName: 'dress',
  //     imageUrl:
  //       'https://images-na.ssl-images-amazon.com/images/I/717Y3LiaoKL._AC_SL1200_.jpg',
  //     active: true
  //   })
  // ])

  // const orderDetails = await Promise.all([
  //   OrderDetail.create({price: 10.0, quantity: 1}),
  //   OrderDetail.create({price: 15.0, quantity: 1})
  // ])

  // const orders = await Promise.all([
  //   Order.create({
  //     orderUserId: 1,
  //     orderTotal: 25.0,
  //     shippingAddress: '123 Main St. New York, NY 11111'
  //   })
  // ])

  const users = await Promise.all([
    User.create({
      userId: 1,
      name: 'Bill',
      email: 'billyBob224@gmail.com',
      password: 'password123',
      type: 'Admin',
      address: '224 billy st',
      phone: '1112223333'
    }),
    User.create({
      userId: 2,
      name: 'Jill',
      email: 'Jilly335@gmail.com',
      password: 'qwerty123',
      type: 'User',
      address: '335 jilly rd',
      phone: '4445556666'
    })
  ])

  // const cart = await Promise.all([
  //   Cart.create({productId: 1, userId: 5}),
  //   Cart.create({productId: 55, userId: 1234}),
  // ])

  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${users.length} users`)
  // console.log(`seeded ${orderDetails.length} order details`)
  // console.log(`seeded ${orders.length} orders`)
  // console.log(`seeded ${cart.length} cart`)
  // console.log(`seeded ${categories.length} categories`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
