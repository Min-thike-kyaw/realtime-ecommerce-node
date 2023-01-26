const Category = require('../models/category');
const Libby = require('../utils/libby')
const gallery = require('../utils/gallery');
const Product = require('../models/product');

let index = async function (req, res) {
    let result = await Category.find().populate({path: 'products', model: Product});
    Libby.mres(res, "All Categories", result);
}
let show = async function (req, res, next) {
    let result = await Category.findById(req.params.id);
    Libby.mres(res, "Category Detail", result)
}
let store = async function(req, res, next) {
    // console.log(req.body);
    // res.send(req.body);
    let newModel = new Category(req.body);
    let result = await newModel.save();
    Libby.mres(res, "Category Saved", result);
}
let update = async function(req, res, next) {
    let cat = await Category.findById(req.params.id);
    if (cat) {
        let result = await Category.findByIdAndUpdate(req.params.id, req.body);
        Libby.mres(res, "Category Updated", result)
    } else {
        next(new Error("Category not found"));
    }
}
let destroy = async function(req, res, next) {
    let cat = await Category.findById(req.params.id);
    gallery.deleteFile(cat.image);
    if (cat) {
        let result = await Category.findByIdAndDelete(req.params.id);
        Libby.mres(res, "Category Updated", {})
    } else {
        next(new Error("Category not found"));
    }
}
module.exports = { index, show ,store, update, destroy };