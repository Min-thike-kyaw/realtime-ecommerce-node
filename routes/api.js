const router = require('express').Router();
const UserController = require('../controllers/user');
const schema = require('../utils/schema');
const validator = require('../utils/validator');

// router.post('/register', validator.validateBody(schema.UserSchema.register),function (req, res, next) {
//     res.send('Hello world');
// });
router.post('/register', [UserController.register]);

router.post('/login', [ validator.validateBody(schema.UserSchema.login), UserController.login]);

module.exports = router;