const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./ecommProduct.js"); //product schema and model import

const Jwt = require("jsonwebtoken");//ganerate jwt token for user authorization user
const jwtKey = "e-comm"

const app = express();
app.use(express.json()); //for get data in body
app.use(cors());
//mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/e-comm');

//mongoose signUp API schema structure for login and register
const signupSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    mobile:Number
})
//mongoose signUp API modle
 const signUser = mongoose.model('signUser', signupSchema)
 
 app.post('/signup', async (req, resp)=>{
     let user = new signUser(req.body)
     let result = await user.save();
     result = result.toObject();
     delete result.password
     console.log("sign = ",result)
        Jwt.sign({result}, jwtKey, {expiresIn:"2h"}, (err, token)=>{ //thired perameter is optional
            if(err){
                resp.send({massage:'no result found try after some time'})
            }else{
                resp.send({result, authToken : token})
            }
        })
})
app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let result = await signUser.findOne(req.body).select("-password");
        if (result) {
            Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(err,token)=>{
                if(err){
                    resp.send("Something went wrong")  
                }
                resp.send({result,authToken:token})
            })
        } else {
            resp.send({ massage: "No User found" })
        }
    } else {
        resp.send({ massage: "No User found" })
    }
});

//////////////////////////////////////////////////////////////////////////////////////

//mongoose product API for complete operation

app.post('/add-product', verifyToken, async (req, resp)=>{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result)
})
app.get('/products', verifyToken, async (req, resp)=>{
    let products = await Product.find({});
    if(products.length>0){
        resp.send(products)
    }else{
        resp.send({result:'no data found'})
    }
})
app.delete('/product/:id', verifyToken, verifyToken, async (req, resp)=>{
    let result = await Product.deleteOne({_id:req.params.id});
    resp.send(result)
})
// for get product to update
app.get('/product/:id', verifyToken, async (req, resp)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result)
    }else{
        resp.send({result:'no record found'})
    }
})
app.put('/product/:id', verifyToken, async (req, resp)=>{
    let result = await Product.updateOne({_id:req.params.id},{$set:req.body});
    resp.send(result)
})
// for get product to search by name, category, comapny
app.get('/search/:key', verifyToken, async (req, resp)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {company:{$regex:req.params.key}}
        ]
    });
        resp.send(result)
})
// for jwt token verify to valid user
function verifyToken(req, resp, next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid)=>{
            if(err){
                resp.status(401).send({result:"please provide valid token"})
            }else{
                next();
            }
        })
    }else{
        resp.status(403).send({result:"please add token with header"})
    }
}

app.listen(4000,()=>{
 console.log("sever listen on 4000 port")
})