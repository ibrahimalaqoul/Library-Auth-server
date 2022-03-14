'use strict';

require('dotenv').config();

const {Sequelize,DataTypes} = require('sequelize');
const user = require('./user')




const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL ;



let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  }:{};


  let sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

  const UserModel = user(sequelize,DataTypes);



  module.exports = {
    db: sequelize,
    User : UserModel,
  }