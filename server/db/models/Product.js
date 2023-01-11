const Sequelize = require('sequelize')
const db = require('../db')

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
    defaultValue:'defaultProduct.png' 
  }
})

module.exports = Product
