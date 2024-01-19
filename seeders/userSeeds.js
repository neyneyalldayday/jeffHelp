const { User } = require('../models');

const userData = [
    {
        username: 'thisguy',
        password: 'thisguyspassword'
    },
    {
        username: 'thisguy2',
        password: 'thisguyspassword'
    },
    {
        username: 'thisgu3',
        password: 'thisguyspassword'
    },
    {
        username: 'thisguy4',
        password: 'thisguyspassword'
    }


];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;