import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import products from './data/products.js'
dotenv.config()

connectDB()

const app=express();

app.get('/',(req,res) => {
    res.send("Please wait we server starting in a second")
})

app.get('/api/products',(req,res) =>{
    res.send(products)
})

app.get('/api/products/:id',(req,res)=>{
    const product = products.find((p)=> p._id===req.params.id)
    res.send(product)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log( `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)