// models/User.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/config');
const bcrypt = require('bcrypt');
class User extends Model {
  matchPassword(loginpw){
    return bcrypt.compareSync(loginpw, this.password)
  }
}

User.init( 
  { 
    id: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4]
    }
  },
  
},
{
  hooks: {
    beforeCreate: async(newUser) => {
      newUser.password = await bcrypt.hash(newUser.password, 10)
      return newUser
    },
    beforeUpdate: async(updatedUser) => {
      updatedUser.password = await bcrypt.hash(updatedUser.password, 10)
      return updatedUser
    },
  },
  sequelize, 
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "User"
});

module.exports = User;
