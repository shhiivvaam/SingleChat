const express = require('express')
const app = express();

const http = require('http')
const server = http.createServer(app);      // request listener
const path = require('path')
const socketio = require('socket.io')
const io = socketio(server);

const users = {};

// for static file
app.use('/', express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log(`io Connection established on: ${socket.id}`);

    socket.on('shhiivvaam-send-msg', (data) => {     // listen to some event
        // console.log(data);

        // socket.emit('shhiivvaam-receive-msg', {
        io.emit('shhiivvaam-receive-msg', {
            msg : data.msg,
            id : socket.id,
            username: users[socket.id]
        })
    });

    socket.on('login', (data) => {
        // console.log(data);

        users[socket.id] = data.username;   // mapping the socket id with the username
    })
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is up and Connected on: ${PORT}`);
})