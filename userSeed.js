const { db, user } = require('./server/db/models/user');

const seed = async () => {
    try {
      await db.sync({ force: true });
      
      const users = [
        {userId: 1, name: "Bill", email: "billyBob224@gmail.com", password: "password123", type: "admin", address: "224 billy st", phone: 1112223333},
        {userId: 2, name: "Jill", email: "Jilly335@gmail.com", password: "qwerty123", type: "customer", address: "335 jilly rd", phone: 4445556666},
    ]
      await Promise.all(users.map(users => {
        return user.create(users);
      }));
  
    } catch (err) {
      console.log(err);
    }
  };
  
  module.exports = seed;
  if (require.main === module) {
    seed()
      .then(() => {
        console.log('Seeding success!');
        db.close();
      })
      .catch((err) => {
        console.error('Oh noes! Something went wrong!');
        console.error(err);
        db.close();
      });
  }
  