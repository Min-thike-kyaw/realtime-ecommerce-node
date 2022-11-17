const mongoose = require('mongoose');
const { Schema } = mongoose;
const UnreadSchema = new Schema({
   from: { type: Schema.Types.ObjectId, required: true },
   to: { type: Schema.Types.ObjectId, required: true },
});
const Unread = mongoose.model('unread', UnreadSchema);

module.exports = Unread;
