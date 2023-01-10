const router = require('express').Router()
const { models: { Product }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      // explicitly select only the id and Productname fields - even though
      // products' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'Productname']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
    try{
        const products = await Product.findAll({})
        res.send(products)
    } catch (err){
        next (err)
    }
})
  
router.get('/:id', async (req, res, next) => {
    try{
        const products = await Product.findByPk(req.params.id)
        res.send(products)
    } catch (err){
        next (err)
    }
})
  
router.post('/', async (req, res, next) => {
    try{
        const products = await Product.create(req.body)
        res.send(products)
    } catch (err){
        next (err)
    }
})
  
router.put('/:id', async(req, res, next) => {
    try{
        const products = await Product.findByPk(req.params.id)
        res.send(await products.update(req.body))
    } catch(err) {
        next(err)
    }
})
  
router.delete('/:id', async (req, res, next) => {
    try{
        const products = await Product.findByPk(req.params.id)
        products.destroy()
        res.send(products)
    } catch (err){
        next (err)
    }
})

module.exports = router