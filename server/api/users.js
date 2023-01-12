const router = require('express').Router()
const { models: { User }} = require('../db')

router.get('/', async (req, res, next) => {
  try{
      const users = await User.findAll({})
      res.send(users)
  } catch (err){
      next (err)
  }
})

router.get('/:id', async (req, res, next) => {
  try{
      const users = await User.findByPk(req.params.id)
      res.send(users)
  } catch (err){
      next (err)
  }
})

router.post('/', async (req, res, next) => {
  try{
      const users = await User.create(req.body)
      res.send(users)
  } catch (err){
      next (err)
  }
})

router.put('/:id', async(req, res, next) => {
  try{
      const user = await User.findByPk(req.params.id)
      res.send(await user.update(req.body))
  } catch(err) {
      next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try{
      const users = await User.findByPk(req.params.id)
      users.destroy()
      res.send(users)
  } catch (err){
      next (err)
  }
})

module.exports = router
