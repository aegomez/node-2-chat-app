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
    from: 'Charlie',
    text: 'What up my dudes',
    date: 1234
  });
  
  socket.on('createMessage', message => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', socket => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log('Server is up on port ' + port);
});
