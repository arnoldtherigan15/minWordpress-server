const router = require('express').Router()
const WpController = require('../controllers/WpController')
const images = require('../helpers/images')
const {authentication, authorization} = require('../middlewares/auth')

router.use(authentication)
router.get('/',WpController.read)
router.get('/all',WpController.readAll)
router.post('/',WpController.create)
router.put('/:id',authorization,WpController.update)
router.delete('/:id',authorization,WpController.delete)
router.post('/upload',
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    console.log('hai');
    
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })


module.exports =router