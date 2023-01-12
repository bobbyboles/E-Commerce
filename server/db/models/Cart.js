const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
    quantity:{
        type: Sequelize.INTEGER
    },
    completed:{
        type: Sequelize.BOOLEAN, 
        defaultValue: false
    }

})

module.exports = Cart


// Has many one product ---- > 
// Products has many carts --- >
//
//Cart has one User / User has many carts
//
//
