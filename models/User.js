const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const {hashPassword} = require('../helpers/bcryptjs')

let Schema = mongoose.Schema

let isEmailValidation = [
    validate({
        validator:'isEmail',
        message:'invalid email format'
    })
]

let userSchema = new Schema({
    username : {type:String,required: [true, 'username is required'],unique:true},
    email : {type:String,required: [true, 'email is required'],unique:true,validate: isEmailValidation},
    password: {type:String,required: [true, 'password is required']},
},{timestamps:true})

userSchema.pre('save',function(next){
    this.password = hashPassword(this.password)
    next()
})

userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next({statusCode:401,msg:'username/email is already taken'});
    } else {
      next('error');
    }
  });

let User = mongoose.model('User',userSchema)

module.exports = User