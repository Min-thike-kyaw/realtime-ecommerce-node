const redis = require('./redis');
const Message = require('../models/message');
const Unread = require('../models/unread');
const Product = require('../models/product');
const Libby = require('../utils/libby')

let liveUser = async (socketId, user) => {
    user['socketId'] = socketId;
    console.log(socketId, user);
    await redis.setObject(socketId, user._id);
    await redis.setObject(user._id, user);
}

let initialize = async (io, socket) => {
    socket['currentUserId'] = socket.userData._id;
    await liveUser(socket.id, socket.userData);

    socket.on('unread', data => sendUnreadMsg(socket));
    socket.on('message',(data) => IncomingMessage(io, socket, data))
    // socket.f
}
let IncomingMessage = async (io, socket, message) => {
    let msg =await new Message(message).save();
    let msgResult = await Message.findById(msg._id).populate('from to');
    let toUser = await redis.getObject(message.to);
    if (toUser) {
        let toSocket = io.of('/chat').sockets.get(toUser.socketId);  // V2
        if (toSocket) {
            console.log("user is online")
            toSocket.emit('message', msgResult)
        } else {
            console.log("user is offline");
            await new Unread({
                from: socket.currentUserId,
                to: message.to
            }).save();
        }
    } else await new Unread({from: socket.currentUserId,to: message.to}).save();
}
let sendUnreadMsg = async function(socket) {
    let unreads = await Unread.find({ to: socket.currentUserId });
    console.log(unreads.length);
    if (unreads.length > 0) {
        for (let unread of unreads) {
            await Unread.findByIdAndDelete(unread._id);
        }
    }
    socket.emit('unread', { msg: unreads.length });
}

module.exports = { initialize };