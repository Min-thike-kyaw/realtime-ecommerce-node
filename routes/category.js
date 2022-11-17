const CategoryController = require('../controllers/category');
const router = require("express").Router();
const gallery = require('../utils/gallery')
const validator = require('../utils/validator')
const schema = require('../utils/schema');


router.get('/', CategoryController.index)
router.post('/', [validator.validateBody(schema.CategorySchema.add),gallery.saveFile,CategoryController.store])
router.route('/:id')
    .get(CategoryController.show)
    .put(CategoryController.update)
    .delete(CategoryController.destroy)
module.exports = router ;
