const mongoose = require("mongoose");

//mongoose product API schema
const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    company:String,
    userid:String
})
//mongoose product API modle
 module.exports = mongoose.model('products', productSchema)