let User = require('../models/user');
let Role = require('../models/role');
let Libby = require('../utils/libby');
let bcrypt = require('bcryptjs');
let register = async function (req, res, next) {
    // res.send(req.body)
    // await User.deleteMany({email: "minthike.mtk.710@gmail.com"});
    // res.send("successful");
    let existUser = await User.findOne({ email: req.body.email });
    console.log("hello world 23");
    if (!existUser) {
        req.body.password = Libby.encode(req.body.password);
        
        let result = await new User(req.body).save();
        Libby.mres(res, 'Register Success');

        // Libby.mres(res, "Registered Successfully");
    } else {

        next(new Error("Email is already in use"));
    }
}
let login = async function (req, res, next) {
    var user = await User.findOne({ email: req.body.email });
    if (user) {
        // res.send([req.body.password, user.name, user]);
        if (bcrypt.compareSync(req.body.password, user.password)) {
            let userObj = user.toObject();
            delete userObj.password;
            userObj.token = Libby.genToken(userObj);
            Libby.mres(res, "Logged in successfully", userObj);
        } else {
            next(new Error("Error does not match"));  
        }
    }else next(new Error("User does'nt exist"));
}


let addRole = async function (req, res, next) {
    let user = await User.findById(req.body.user_id)
    if (user) {
        if (user.roles.find(rid => rid.equals(req.body.role_id))) {
            next(new Error("User has already this role"));
        } else {
            await User.findByIdAndUpdate(req.body.user_id, {$push : req.body.role_id})
            Libby.mres(res, "Role added successfully");
        }
    }
    next(new Error("Invalid Id"));
}
let removeRole = async function (req, res, next) {
    let user = await User.findById(req.body.user_id)
    let found = user.roles.find(rid => rid.equals(req.body.role_id))
    if (found) {
        await User.findByIdAndUpdate(req.body.user_id, {$push : req.body.role_id})
        Libby.mres(res, "Role removed successfully");
    }
    next(new Error("User already do not have this role"));
}
module.exports = { register, login , addRole, removeRole};