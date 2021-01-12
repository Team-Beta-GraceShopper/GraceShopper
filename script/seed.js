'use strict'

const db = require('../server/db/db')
const Product = require('../server/db/models/product')

async function seed() {
  await db.sync({force: true})

  const sweater1 = await Product.create({
    name: 'Christmas Sweater',
    category: 'Sweater',
    price: 100,
    imageUrl:
      'https://www.bowwowsbest.com/v/vspfiles/photos/DOD-57243-2.jpg?v-cache=1539333998',
    productQuantity: 5,
    inStock: true,
    description: 'wonderful sweater for the festive seasons',
    size: 'small'
  })

  const sweater2 = await Product.create({
    name: 'Ugly Sweater',
    category: 'Sweater',
    price: 150,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0512/7721/products/Red_Hearts_1024x1024.jpg?v=1602266507',
    productQuantity: 10,
    inStock: true,
    description: 'the ugliest of sweaters for ',
    size: 'large'
  })

  const dress1 = await Product.create({
    name: 'Birthday Dress',
    category: 'Dresses',
    price: 200,
    imageUrl:
      'https://s7d2.scene7.com/is/image/PetSmart/5294347?$pdp-placeholder-desktop$',
    productQuantity: 3,
    inStock: true,
    description: 'A wonderfur birthday dress for that special day',
    size: 'xsmall'
  })

  const dress2 = await Product.create({
    name: 'Formal Dress',
    category: 'Dresses',
    price: 300,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/717Y3LiaoKL._AC_SL1200_.jpg',
    productQuantity: 10,
    inStock: true,
    description: 'A elegant dress for those long walks at the park',
    size: 'small'
  })

  console.log('db synced!')

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])

  // console.log(`seeded ${users.length} users`)
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
