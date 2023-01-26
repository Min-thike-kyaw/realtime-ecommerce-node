const UserController = require('../controllers/user');
const router = require("express").Router();
const validator = require('../utils/validator')
const schema = require('../utils/schema');
const User = require('../models/user');

router.get('/', async function (req, res, next) {
    let result = await User.find();
    res.send(result);
})

router.post('/add-role', [validator.validateBody(schema.UserSchema.addRole),UserController.addRole])
router.post('/remove-role', [validator.validateBody(schema.UserSchema.removeRole),UserController.removeRole])

module.exports = router;