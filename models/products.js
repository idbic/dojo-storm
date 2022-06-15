const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model 

const productSchema = new Schema(
    {
        name: String, 
        image: String,
        price: Number,
        description: String,
        sizes: String, 
        sizeGuide: String,
        addInfo: String,
        truetosize: Boolean
    }
)

const Product = model('product', productSchema)

module.exports = Product