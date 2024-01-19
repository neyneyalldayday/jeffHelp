const seedComments = require('./commentSeeds.js');
const seedPosts = require('./postSeeds.js');
const seedUsers = require('./userSeeds.js');


const sequelize = require('../config/config');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUsers();
 
  console.log('\n----- Comments SEEDED -----\n');

  await seedPosts();
  console.log('\n----- Posts SEEDED -----\n');

  await seedComments();
  console.log('\n----- users SEEDED -----\n');



  process.exit(0);
};

seedAll();
