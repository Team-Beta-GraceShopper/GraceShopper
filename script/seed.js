'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

const products = [
  {
    name: 'Tuxedo',
    category: 'formal',
    price: 4000,
    imageUrl:
      'https://www.dhresource.com/0x0/f2/albu/g4/M00/81/F0/rBVaEFds4Z-AaBqjAAams5cUse8326.jpg/pet-clothes-large-cute-pet-dog-cat-clothes.jpg',
    productQuantity: 1000,
    inStock: true,
    description: 'A winner for those COVID candlelit dinners'
  },
  {
    name: 'Pretty in Pink',
    category: 'dress',
    price: 4000,
    imageUrl:
      'https://cdn11.bigcommerce.com/s-t1ww8z0rje/images/stencil/1280x1280/products/1891/7919/O1CN01OXcqXG1MabImK1PMj_53261451__17554.1596523142.jpg?c=2',
    productQuantity: 1000,
    inStock: true,
    description: 'For the days when you feel flirty'
  },
  {
    name: 'Pajama Party',
    category: 'sweater',
    price: 2000,
    imageUrl:
      'https://cdn11.bigcommerce.com/s-t1ww8z0rje/images/stencil/1280x1280/products/1897/7957/O1CN0171F5cP1MabInKjIms_53261451__29794.1597287848.jpg?c=2',
    productQuantity: 1000,
    inStock: true,
    description: 'For when you have no Zoom meetings'
  },
  {
    name: 'Yoga Time',
    category: 'sweater',
    price: 3000,
    imageUrl:
      'https://mi0.rightinthebox.com/images/384x384/201802/kghh1517971349075.jpg',
    productQuantity: 1000,
    inStock: true,
    description: 'Perfect for leg day'
  },
  {
    name: 'Valentines Day',
    category: 'sweater',
    price: 3000,
    imageUrl:
      'https://mi0.rightinthebox.com/images/384x384/201311/rjra1385615797343.jpg',
    productQuantity: 1000,
    inStock: true,
    description: 'When you just want to show some love'
  },
  {
    name: 'Louis Vuipaw',
    category: 'sweater',
    price: 6000,
    imageUrl:
      'https://i.pinimg.com/originals/31/9a/dd/319addb3735341e1664a6c0826a4a3ef.jpg',
    productQuantity: 1000,
    inStock: true,
    description: 'When you want to channel your inner Kanye'
  },
  {
    name: 'Feeling Fancy',
    category: 'dress',
    price: 3000,
    imageUrl:
      'https://www.dhresource.com/0x0/f2/albu/g11/M01/9A/9F/rBNaFl8ZAvyAG9MpAAQPxKg3rL8538.jpg/stripe-tutu-dress-cute-pet-dog-dress-black.jpg',
    productQuantity: 1000,
    inStock: true,
    description: 'Perfect for those date nights'
  },
  {
    name: `My Best Friend's Wedding`,
    category: 'dress',
    price: 5000,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61edmhSRgDL._AC_UX522_.jpg',
    productQuantity: 1000,
    inStock: true,
    description: 'The perfect head turner'
  },
  {
    name: 'Christmas Sweater',
    category: 'sweater',
    price: 2000,
    imageUrl:
      'https://www.bowwowsbest.com/v/vspfiles/photos/DOD-57243-2.jpg?v-cache=1539333998',
    productQuantity: 1000,
    inStock: true,
    description: 'A wonderful sweater for festive seasons'
  },
  {
    name: 'Formal Dress',
    category: 'dress',
    price: 3000,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/717Y3LiaoKL._AC_SL1200_.jpg',
    productQuantity: 1000,
    inStock: true,
    description: 'An elegant dress for those long walks on the beach'
  },
  {
    name: 'Ugly Sweater',
    category: 'sweater',
    price: 1500,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0512/7721/products/Red_Hearts_1024x1024.jpg?v=1602266507',
    productQuantity: 1000,
    inStock: true,
    description: 'The ugliest of sweaters for that ugly sweater party'
  },
  {
    name: 'Birthday Dress',
    category: 'dress',
    price: 2000,
    imageUrl:
      'https://s7d2.scene7.com/is/image/PetSmart/5294347?$pdp-placeholder-desktop$',
    productQuantity: 1000,
    inStock: true,
    description: 'A wonderfur birthday dress for that special day'
  }
]

const users = [
  {
    name: 'Customer',
    email: 'customer999@gmail.com',
    password: 'Q1w2E3r5T6y7U8i9O0',
    type: 'user',
    address: '',
    phone: ''
  },
  {
    name: 'Bill',
    email: 'billyBob224@gmail.com',
    password: 'password123',
    type: 'Admin',
    address: '224 billy st',
    phone: '1112223333'
  },
  {
    name: 'Jill',
    email: 'Jilly335@gmail.com',
    password: 'qwerty123',
    type: 'User',
    address: '335 jilly rd',
    phone: '4445556666'
  },
  {
    name: 'Cody',
    email: 'cody@email.com',
    password: '12345',
    type: 'User',
    address: '123 Main St.',
    phone: '1111111111'
  },
  {
    name: 'Alex',
    email: 'alex@email.com',
    password: '12345',
    type: 'User',
    address: '123 Alex St.',
    phone: '2222222222'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const createdProducts = await Product.bulkCreate(products)
  const createdUsers = await User.bulkCreate(users)

  console.log(`seeded ${createdProducts.length} products`)
  console.log(`seeded ${createdUsers.length} users`)
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
