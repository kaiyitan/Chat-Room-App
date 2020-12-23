const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/user');








const app = express();
// express by default will perform the conversion to http server 
// However, we need access to the http server
// Thats why we perform it manually
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, '../public')))

const port = process.env.PORT || 3000;

const welcomeMessage = "Welcome to chat app!";








io.on('connection', (socket) => {
    console.log("New web scoket connection")

    socket.on('join', ({ username, room }, callback) => {

        const { error, user } = addUser({ id: socket.id, username, room })
        if (error) {
            return callback(error);
        }

        // join a room, only can do in server, it give us a whole new way to emit event in the room
        socket.join(user.room)

        // io.to.emit (emit event for all user in a room)
        // socket.broadcast.to.emit (emit event for all user in a room except the client trigger the event)

        socket.emit('message', generateMessage("Admin", welcomeMessage));
        socket.broadcast.to(user.room).emit('message', generateMessage("Admin", `${user.username} has joined!`))

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback();

    })

    socket.on('sendMessage', (message, callback) => {

        const user = getUser(socket.id);

        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed');
        }

        io.to(user.room).emit('message', generateMessage(user.username, message))

        // emit event to all connection
        // io.emit('message', generateMessage(message))
        // emit event to only the one trigger this event
        // socket.emit('welcome', message);

        //for ackowledgement server received the message
        callback();
    })

    socket.on('sendLocation', (location, callback) => {
        const user = getUser(socket.id);
        const locationUrl = `https://google.com/maps?q=${location.latitude},${location.longitude}`;
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, locationUrl));
        callback();
    })

    socket.on('disconnect', () => {

        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage("Admin", `${user.username} has left`));
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })

})












server.listen(port, () => {
    console.log("Http server Listen on port " + port)
})