import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Order from '../models/Order'
import { auth } from '../utils'

const OrderRouter = express.Router()

OrderRouter.post('/', auth, expressAsyncHandler (async (req, res) => {
   try{
      
    const newOrder = new Order ({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice : req.body.itemsPrice,
        tax: req.body.tax,
        shippingPrice: req.body.shippingPrice,
        totalMoney: req.body.totalMoney
    })

    const savedOrder = await newOrder.save()
    console.log(savedOrder)
    res.status(201).send({order: savedOrder})
   } catch (error) {
       console.log(error)
       res.status(500).send({message: error})
   }
   
}))

OrderRouter.get('/:id', auth, expressAsyncHandler(async (req, res) => {
    try{
        const order = await Order.findOne({_id: req.params.id , user: req.user._id})
        console.log(order)
        if(!order){
            res.status(404).send({message: 'order not found'})
        }else {
            res.send(order)
        }

    }catch (e) {
        console.log(e)
        res.status(500).send({message: e.message})
    }
}))

OrderRouter.get('/my/orders', auth, expressAsyncHandler(async (req, res) => {
    try{
        const orders = await Order.find({user: req.user._id})
        res.send(orders)
    }catch(e){
        console.log(e)
        res.status(500).send({message: e.message})
    }
}))




export default OrderRouter