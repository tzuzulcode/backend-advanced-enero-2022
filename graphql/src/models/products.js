const {mongoose} = require("../config/db")

const {Schema} = mongoose

const productSchema = new Schema({
    name:String,
    description:String,
    categories:Array,
    stock:Number,
    price:Number,
})

const ProductModel = mongoose.model("products",productSchema)

module.exports = ProductModel