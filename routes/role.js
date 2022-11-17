const Role = require('../controllers/role');
const router = require("express").Router();
const gallery = require('../utils/gallery')
const validator = require('../utils/validator')
const schema = require('../utils/schema');


router.get('/', Role.index)
router.post('/', [validator.validateBody(schema.RoleSchema.add),Role.store])
router.route('/:id')
    .get(Role.show)
    .put(Role.update)
    .delete(Role.destroy)
module.exports = router ;
