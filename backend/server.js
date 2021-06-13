const express=require('express')
const {products}=require('./data/products.js')

const app=express();

app.get('/',(req,res) => {
    res.send("Please wait we server starting in a second")
})

app.get('/api/products',(req,res) =>{
    res.send(products)
})

app.get('/api/products/:id',(req,res)=>{
    const product = products.find((p)=> p._id===req.params.id)
    res.json(product)
})

app.listen(5000,console.log("Server Started"))