'use strict'

const db = require('../server/db')
const {User, Cart} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

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

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const cart = await Promise.all([
    Cart.create({productId: 1, userId: 5}),
    Cart.create({productId: 55, userId: 1234})
  ])
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
