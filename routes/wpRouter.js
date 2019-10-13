const router = require('express').Router()
const WpController = require('../controllers/WpController')
const {authentication, authorization} = require('../middlewares/auth')

router.use(authentication)
router.get('/',WpController.read)
router.get('/all',WpController.readAll)
router.post('/',WpController.create)
router.put('/:id',authorization,WpController.update)
router.delete('/:id',authorization,WpController.delete)


module.exports =router