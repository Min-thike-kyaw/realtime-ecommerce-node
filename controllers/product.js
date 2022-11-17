const Product = require('../models/product');
const Libby = require('../utils/libby')
const gallery = require('../utils/gallery');
let index = async function (req, res) {
    let result = await Product.find().populate('category');
    Libby.mres(res, "All Products", result);
}

let show = async function (req, res, next) {
    let result = await Product.findById(req.params.id);
    Libby.mres(res, "Product Detail", result)
}

let store = async function(req, res, next) {
    let newModel = new Product(req.body);
    let result = await newModel.save();
    Libby.mres(res, "Product Saved", result);
}

let update = async function(req, res, next) {
    let products = await Product.findById(req.params.id);
    if (products) {
        let result = await Product.findByIdAndUpdate(req.params.id, req.body);
        Libby.mres(res, "Product Updated", result)
    } else {
        next(new Error("Product not found"));
    }
}

let destroy = async function(req, res, next) {
    let products = await Product.findById(req.params.id);
    gallery.deleteFiles(products.images);
    if (products) {
        let result = await Product.findByIdAndDelete(req.params.id);
        Libby.mres(res, "Product Updated", {})
    } else {
        next(new Error("Product not found"));
    }
}

module.exports = { index, show ,store, update, destroy };