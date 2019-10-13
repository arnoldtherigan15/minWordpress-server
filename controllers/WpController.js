const Wp = require('../models/Wp')

class WpController {
    static readAll(req,res,next) {
        Wp.find()
        .then(article=>{
            res.status(200).json(article)
        })
        .catch(next)
    }
    static read(req,res,next) {
        Wp.find({user:req.loggedUser._id})
        .then(article=>{
            res.status(200).json(article)
        })
        .catch(next)
    }
    static create(req, res, next){
        let {title,content} = req.body
        Wp.create({title,content,user:req.loggedUser._id,author:req.loggedUser.username})
        .then(data=>{
            console.log(data,'ini loh');
            
            res.status(201).json(data)
        })
        .catch(next)
    }
    static update(req,res,next) {
        let {title,content} = req.body
        let {id} = req.params
        Wp.updateOne({_id:id},{title,content})
        .then(article=>{
            res.status(201).json(article)
        })
        .catch(next)
    }
    static delete(req,res,next) {
        let {id} = req.params
        Wp.deleteOne({_id:id})
        .then(article=>{
            res.status(201).json(article)
        })
        .catch(next)
    }
}

module.exports = WpController