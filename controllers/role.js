const Role = require('../models/role');
const Libby = require('../utils/libby')

let index = async function (req, res) {
    let result = await Role.find();
    Libby.mres(res, "All Categories", result);
}
let show = async function (req, res, next) {
    let result = await Role.findById(req.params.id);
    Libby.mres(res, "Role Detail", result)
}
let store = async function(req, res, next) {
    let newModel = new Role(req.body);
    let result = await newModel.save();
    Libby.mres(res, "Role Saved", result);
}
let update = async function(req, res, next) {
    let cat = await Role.findById(req.params.id);
    if (cat) {
        let result = await Role.findByIdAndUpdate(req.params.id, req.body);
        Libby.mres(res, "Role Updated", result)
    } else {
        next(new Error("Role not found"));
    }
}
let destroy = async function(req, res, next) {
    let cat = await Role.findById(req.params.id);
    if (cat) {
        let result = await Role.findByIdAndDelete(req.params.id);
        Libby.mres(res, "Role Deleted", {})
    } else {
        next(new Error("Role not found"));
    }
}
module.exports = { index, show ,store, update, destroy };