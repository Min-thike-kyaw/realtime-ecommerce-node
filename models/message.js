const mongoose = require('mongoose');
const { Schema } = mongoose;
const MessageSchema = new Schema({
   from: { type: Schema.Types.ObjectId, requird: true, ref: 'user' },
   to: { type: Schema.Types.ObjectId, requird: true, ref: 'user' },
   type: { type: String, enum: ['text', 'img'], default: 'text' },
   msg: { type: String, required: true },
   created: { type: Date, default: Date.now }
});
const Message = mongoose.model('message', MessageSchema);

module.exports = Message;