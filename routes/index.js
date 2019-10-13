const router = require('express').Router()
const wpRouter = require('./wpRouter')
const userRouter = require('./userRouter')
// const images = require('../helpers/images')

router.use('/article',wpRouter)
router.use('/user',userRouter)
// router.post('/upload',
//   images.multer.single('image'), 
//   images.sendUploadToGCS,
//   (req, res) => {
//     console.log('hai');
    
//     res.send({
//       status: 200,
//       message: 'Your file is successfully uploaded',
//       link: req.file.cloudStoragePublicUrl
//     })
//   })

module.exports = router