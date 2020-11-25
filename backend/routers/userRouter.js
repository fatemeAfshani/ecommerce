import express from 'express'
import User from '../models/User'
import expressAsyncHandler from 'express-async-handler'
import {generateToken, auth}  from '../utils'


const UserRouter = express.Router()

UserRouter.get('/createAdmin',expressAsyncHandler(async (req, res) => {
   try{
    const admin = new User({
        name:' admin',
        email:'admin@email.com',
        password:'this is a password',
        isAdmin: true
    })

    await admin.save()
    res.send(admin)

}catch(e) {
    res.status(500).send(e)
}

}))

UserRouter.post('/signin', (async (req, res) => {
    const signinUser =await  User.findOne({email: req.body.email, password: req.body.password})
    if(!signinUser) {
        res.status(401).send({message: 'email or password is wrong'})
    }else {
        res.send({
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            password: signinUser.password,
            isAdmin: signinUser.isAdmin,
            token: generateToken(signinUser)
        })
    }
}))

UserRouter.post('/register',expressAsyncHandler(async (req, res) => {
    
    const user = new User({name: req.body.name, email: req.body.email, password: req.body.password})

    const savedUser = await user.save()
    
    if(!savedUser) {
        res.status(401).send({message: 'user data are not right'})
    }else {
        res.send({
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            password: savedUser.password,
            isAdmin: savedUser.isAdmin,
            token: generateToken(savedUser)
        })
    }
}))

UserRouter.put('/update',auth , expressAsyncHandler(async (req, res) => {
    try{
  
    req.user.name = req.body.name || req.user.name
    req.user.email = req.body.email || req.user.email
    req.user.password = req.body.password || req.user.password

     const newUser = await req.user.save()
     
    res.send({  _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        isAdmin: newUser.isAdmin,
        token: req.token
    })
    }catch(E) {
        res.status(500).send({message: E.message})
    }
}))





export default UserRouter