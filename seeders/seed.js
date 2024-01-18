// seed.js

const db = require('../models'); 
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
  try {
    // Create a sample user
    await db.User.create({
      username: 'sampleUser',
      password: await bcrypt.hash('password123', 10),
    });

    // Create some sample blog posts
    await db.Post.create({
      title: 'Sample Post 1',
      content: 'This is the content of Sample Post 1.',
      UserId: 1, 
    });

    await db.Post.create({
      title: 'Sample Post 2',
      content: 'This is the content of Sample Post 2.',
      UserId: 1,
    });

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
