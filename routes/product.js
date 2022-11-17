const ProductController = require('../controllers/product');
const router = require("express").Router();
const gallery = require('../utils/gallery')
const validator = require('../utils/validator')
const schema = require('../utils/schema');


router.get('/', ProductController.index)
router.post('/', [validator.validateBody(schema.ProductSchema.add),gallery.saveFiles,ProductController.store])
router.route('/:id')
    .get(ProductController.show)
    .put(ProductController.update)
    .delete(ProductController.destroy)
module.exports = router ;
