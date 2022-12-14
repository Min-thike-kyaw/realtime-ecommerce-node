const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleSchema = new Schema({
    name: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: "user" }],
    created: { type: Date, default: Date.now }
});

const Role = mongoose.model('role', RoleSchema);
module.exports = Role;