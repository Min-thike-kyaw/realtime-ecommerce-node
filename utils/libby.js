const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let mres = (res, msg, result = {}) => {
    res.status(200).json({status: true, message: msg, data : result})
}
let getSocketToken = (socket, next) => {
 
    let token = socket.handshake.query.token;
    if (token) {
        
        try {
            let user = jwt.verify(token, process.env.SECRET_KEY);
            socket.userData = user.data;
            next();
        } catch (error) {
            next(new Error("Token mismatch error"))
        }
    } else next(new Error("Token error"));

}
module.exports = {
    mres,
    encode: (password) => bcrypt.hashSync(password, 10),
    compassword: (password, hash) => bcrypt.compareSync(password,hash ),
    genToken : (data) => jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: data
    }, process.env.SECRET_KEY),
    getSocketToken 
};