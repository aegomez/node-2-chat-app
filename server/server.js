// library imports
const path = require('path');

// Setup Socket.IO + Express
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// local imports
const { generateMessage } = require('./utils/message');

const port = process.env.PORT || 9000;
const publicPath = path.join(__dirname, '../public');

// static middleware
app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');
  
  socket.emit('newMessage', generateMessage('Admin', 'The Admin welcomes you to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user appeared!'));

  socket.on('createMessage', message => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('disconnect', socket => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log('Server is up on port ' + port);
});
