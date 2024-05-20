console.log("Praise The Lord");
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require ('./model/product.model.js');

app.use(express.json()); // Middleware used to pass nodejs to json
app.use(express.urlencoded({extended:false}));//By using this data can be added in form format

app.get('/', (req, res)=>{

    res.send("Node API is running")
});

//Get all detials
app.get('/api/products', async(req,res)=>{
    try {
        const pro = await Product.find({});
        res.status(200).json(pro);
    } catch (err) {
        res.status(500);
    }
});

//Get single detial
app.get('/api/products/:id', async(req,res)=>{
    try {
        const { id } = req.params;
        const prod = await Product.findById(id);
        res.status(200).json(prod);
    } catch (err) {
        res.status(500).json({message: error.message});
    }
});

//Update 
app.patch('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json();
    }
});

//delete
app.delete('/api/products/:id', async(req,res)=>{
    try {
        const { id }=req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:"Product not Found"});
        }
        res.status(200).json({message:"Product deleted successfully"});
    } catch (error) {
        res.status(500).json();
    }
});

app.post('/api/products',async(req,res)=>{
    try {
        const goods = await Product.create(req.body);
        res.status(200).json(goods);
    } catch (err) {
        res.status(500).json({message:error.message});
    }
});

mongoose.connect("mongodb+srv://kevinmathew365:TH4WN2adyQ4sHoJW@cluster0.wtmdg1i.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Database Connected");
    app.listen(3000,()=>{
        console.log("Server is running on  port 3000");
    });
})
.catch((err)=>{
    console.error("Connection Failed:", err);
});
