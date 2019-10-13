const mongoose = require('mongoose')

let Schema = mongoose.Schema


let wpSchema = new Schema({
    title : {type:String,required: [true, 'username is required']},
    content : {type:String,required: [true, 'username is required']},
    user : {
        type:  Schema.Types.ObjectId,
        ref:'users'
    },
    author : String
},{timestamps:true})

let Wp = mongoose.model('Wp',wpSchema)

module.exports = Wp