'use strict'

const db = require('../server/db')
const {OrderDetail, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const orderDetails = await Promise.all([
    OrderDetail.create({orderId: 1, productId: 1, price: 10.0, quantity: 1}),
    OrderDetail.create({orderId: 1, productId: 2, price: 15.0, quantity: 1})
  ])

  const orders = await Promise.all([
    Order.create({
      orderUserId: 1,
      orderTotal: 25.0,
      shippingAddress: '123 Main St. New York, NY 11111'
    })
  ])

  console.log(`seeded ${orderDetails.length} orderDetails`)
  console.log(`seeded ${orders.length} orders`)
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
