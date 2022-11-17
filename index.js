require('dotenv').config()

const express = require('express'),
     app = express(),
     { createServer } = require("http"),
     { Server } = require("socket.io")

     httpServer = createServer(app),
     io = new Server(httpServer),


     bodyParser = require('body-parser'),
     router = require("express").Router(),
     mongoose = require('mongoose'),
     fileUpload = require('express-fileupload'),
     
         
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(fileUpload());

mongoose.connect('mongodb://localhost:27017/emart');
// const asyncRedis = require("async-redis");
// const client = asyncRedis.createClient();

// client.on("error", function (err) {
//     console.log("Error " + err);
// });
app.use('/test', async function (req, res, next) {
    // await client.set('key', 'value');
    // await client.del('key');
    // var data = await client.get('key');
    // if (data) {
        
    //     res.send(data);
    // } else res.send("no value with this key");

})

const CategoryRouter = require('./routes/category');
const UserRouter = require('./routes/user');
const ApiRouter = require('./routes/api');
const ProductRouter = require('./routes/product');
const RoleRouter = require('./routes/role');
const { validateToken} = require('./utils/validator');
const libby = require('./utils/libby');
app.use('/categories', validateToken,CategoryRouter);
app.use('/products',validateToken, ProductRouter);
app.use('/api' ,ApiRouter);
app.use('/users', UserRouter);
app.use('/roles', RoleRouter);
app.use('/val', function (req, res, next) {
    res.send("Hello world");
})
app.use((err, req, res, next) => {
    err.status = err.status || 404;
    res.status(err.status).json({ status: false,message: err.message });
 });
 
app.get("*", (req, res) => {
res.status(404).send({ status: false, message: "No route with that request!" });
});

// io.on("connection", (socket) => {
//     console.log(socket)
    
//     socket.on("client-hello", (arg) => {
//         socket.emit("server-hello", "Hello this is from server");
//     });
//     socket.on("disconnect", (  ) => {
//         console.log("he's disconnected")
//         console.log(socket.id); // undefined
//     });
// });
const chat = require('./utils/chat');
io.of('/chat').use((socket, next) => {
    libby.getSocketToken(socket, next)
}).on("connection", function (socket) {
    chat.initialize(io, socket);
})
  
app.use(router);
httpServer.listen(process.env.PORT, () => {
    console.log(`Example app is listening on port ${process.env.PORT}`);
})