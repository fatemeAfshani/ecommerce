// const express = require('express')
// const {products} = require('./data')
// const cors = require('cors')
// installed babel to be able to use ES6 syntax \ o_O / !!

import express from 'express'
import cors from 'cors'
import data from './data'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRouter from './routers/userRouter'
import OrderRouter from './routers/orderRouter'

dotenv.config()

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then( () =>{
  console.log('connected to db')
  }).catch ((error) => {
    console.log(error)
  })


const app = express()
app.use(cors())
app.use(express.json())
app.use('/user', UserRouter)
app.use('/order', OrderRouter)

app.get('/api/products', (req, res) => {
  try{
    res.send(data)
  }catch(e) {
    res.status(404).send({message: 'unable to get products data'})
  }
})

app.get('/api/products/:id', (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const product = data.products.find(pro => pro._id == req.params.id)
  
  if(!product){
    res.status(404).send({message: 'product not found'})
  }
  res.send(product)
})

app.use((error, req, res , next) => {
  const status = error.name && error.name === 'ValidationError' ? 400 : 500
  res.status(status).send({message: error.message})
})

app.listen(3000, () => {
    console.log('server is up and running...')
})
