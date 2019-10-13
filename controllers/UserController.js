const User = require('../models/User')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class UserController {
    static register (req,res,next) {
        const {username,email,password} = req.body
        User.create({username,email,password})
        .then(result => {
            let payload = {username:result.username,_id:result._id,email:result.email}
            let token = generateToken(payload)
            res.status(201).json({token,username,email})
        })
        .catch(err=>{
            next(err)
        })
    }
    static login (req,res,next) {
        const {email,password} = req.body
        User.findOne({email})
        .then(user=>{
            if(user && comparePassword(password,user.password)) {
                let payload = {username:user.username,_id:user._id,email:user.email}
                let token = generateToken(payload)
                res.status(200).json({token,username:user.username,email:user.email})
            } else {
                throw {
                    msg: 'invalid email/password',
                    statusCode: 401
                }
            }
        })
        .catch(next)
    }
    static signGoogle(req, res, next){
        console.log('masukkkkk gugel');

        const client = new OAuth2Client(process.env.CLIENT_ID);
        console.log(client);
        
        let username 
        let email
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE
        })
            .then(ticket => {
                
                username= ticket.getPayload().name
                email= ticket.getPayload().email
                
                return User.findOne({username})
            })
            .then(user => {
                if (user){
                    const payload = {username}
                    let token = generateToken(payload)
                    res.status(201).json(token)
                }
                else{
                    return User.create({username,email, password:"google"})
                }
            })
            .then(result => {
                let payload = {username:result.username}
                let token = generateToken(payload)
                res.status(201).json(token)
            })
            .catch(next)
    }

}

module.exports = UserController