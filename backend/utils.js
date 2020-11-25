import jwt from 'jsonwebtoken'
import { getLocalProducts, getUserFromLocalStorage } from '../frontEnd/src/localstorage'
import User from './models/User'

export const generateToken =  (user) => {
    return jwt.sign({
        _id: user._id
    }, process.env.SECRET)

}


export const auth = async (req, res, next ) => {
    try{
    const reqToken = req.header('Authorization').replace('Bearer ', '')
    const TokenVerified = jwt.verify(reqToken, process.env.SECRET)
    const user = await User.findById(TokenVerified._id)

        if(!user) {
        res.status(404).send({message: 'token is invalid'})
        }else{
            req.user = user
            req.token = reqToken
            next()
        }

    }catch(e) {
        res.status(401).send({message: e.message})
    }
}


export const redirect = () => {
    if(getLocalProducts().length != 0){
        document.location.hash = '/shipping'
    } else {
        document.location.hash = '/'
    }
    
}

