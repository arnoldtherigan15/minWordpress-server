const router = require('express').Router()
const wpRouter = require('./wpRouter')
const userRouter = require('./userRouter')

router.use('/article',wpRouter)
router.use('/user',userRouter)

module.exports = router