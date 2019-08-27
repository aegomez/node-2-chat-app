// library imports
import http = require('http');
import path = require('path');

import express = require( 'express');
import socketIO = require ('socket.io');

// local imports
import { generateMessage, generateLocationMessage } from './utils/message';
import { isRealString } from './utils/validation';
import { Users } from './utils/users';

// Setup Socket.IO + Express
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || '9000';
const publicPath = path.join(__dirname, '../public');

const users = new Users();

// static middleware
app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('join', (params: chatApp.SearchParams, callback: (err?: string) => void) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }
    callback();

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
  });

  socket.on('createMessage', (message: chatApp.Message, callback: () => void) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords: chatApp.Location) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords));
  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
  console.log('Server is up on port ' + port);
});
