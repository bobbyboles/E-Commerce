const Sequelize = require('sequelize')
const db = require('../db')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt');
const sequelize = require('sequelize');

const Cart = db.define('cart', {
  subTotal: {
    type: Sequelize.DECIMAL( 10 , 2 )
  }
})

module.exports = Cart


// Has many one product ---- > 
// Products has many carts --- >
//
//Cart has one User / User has many carts
//
//
