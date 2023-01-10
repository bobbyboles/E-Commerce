const Sequelize = require('sequelize')
const db = require('../db')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt');
const sequelize = require('sequelize');

const Product = db.define('product', {
  productName: {
    type: Sequelize.STRING,
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
  },
  imageUrl: {
    type:Sequelize.TEXT,
    defaultValue: 'https://cdn.shopify.com/s/files/1/0559/6345/1567/products/VGP-SNESC-3.jpg?v=1635936112'
  }
})

module.exports = Product
