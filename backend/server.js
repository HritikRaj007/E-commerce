import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app=express();

app.get('/',(req,res) => {
    res.send("Please wait we server starting in a second")
})

app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log( `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)