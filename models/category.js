const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: { type: String, required: true },
    
    parent_category : { type: Schema.Types.ObjectId, ref: "category" },
    child_categories : [{ type: Schema.Types.ObjectId, ref: "category" }],
    products : [{ type: Schema.Types.ObjectId, ref: "product" }],
    image: { type: String, required: true },
    created: { type: Date, default: Date.now },
});

const Category = mongoose.model('category', CategorySchema);
module.exports = Category;