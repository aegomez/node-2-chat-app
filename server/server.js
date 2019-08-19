// library imports
const path = require('path');

// Setup Socket.IO + Express
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 9000;
const publicPath = path.join(__dirname, '../public');

// static middleware
app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');
  
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'The Admin welcomes you to the chat app',
    date: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user appeared!',
    date: new Date().getTime()
  })

  socket.on('createMessage', message => {
    console.log('createMessage', message);
    
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      date: new Date().getTime()
    });
  });

  socket.on('disconnect', socket => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log('Server is up on port ' + port);
});
