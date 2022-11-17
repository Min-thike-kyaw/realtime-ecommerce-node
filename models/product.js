const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: {type: Number, required: true},
    category: { type: Schema.Types.ObjectId, ref: "category" },
    colors: { type: Array, required: true },
    images: { type: Array, required: true },
    created: { type: Date, default: Date.now },
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;