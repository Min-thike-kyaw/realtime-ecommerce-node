const jwt = require('jsonwebtoken');

const validateBody = (schema) => function (req, res, next) {
    let result = schema.validate(req.body);
    if (result.error) {
        next (new Error(result.error.details[0].message))
    } else {
        next();
    }
}
const validateToken = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            let token = req.headers.authorization.split(' ')[1];
            let userData = jwt.verify(token, process.env.SECRET_KEY);
            req.body.user = userData;
            next();
        } catch (error) {
            next(new Error("Token mismatch error"))
        }
    } else next(new Error("No token"));
}
module.exports = { validateBody, validateToken };
