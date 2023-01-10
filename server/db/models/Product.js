const Sequelize = require('sequelize')
const db = require('../db')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt');
const sequelize = require('sequelize');

const Product = db.define('product', {
  productName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stockQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL( 10 , 2 ),
    allowNull: false
  }
})

module.exports = Product
