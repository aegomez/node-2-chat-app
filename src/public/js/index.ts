var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message: chatApp.DatedMessage) {
  console.log('New message:', message);
  
  var li = document.createElement('li');
  li.textContent = message.from + ': ' + message.text;
  $('#message-list').appendChild(li);
});

socket.on('newLocationMessage', function(message: chatApp.LocationMessage) {
  var li = document.createElement('li');
  var a = document.createElement('a');

  li.textContent = (message.from + ': ');
  a.textContent = 'My current location';
  a.setAttribute('href', message.url);
  a.setAttribute('target', '_blank');
  
  li.appendChild(a);
  $('#message-list').appendChild(li);
});

$('#message-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var message: chatApp.Message = {
    from: 'Anon',
    text: ($('[name=message]') as HTMLInputElement).value
  };

  socket.emit('createMessage', message, function(data: string) {
    console.log('Got it', data);
  });
});

var locationButton = $('#send-location');

locationButton.addEventListener('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  navigator.geolocation.getCurrentPosition(
    function success(position) {
      var location: chatApp.Location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      socket.emit('createLocationMessage', location);
    },
    function error() {
      alert('Unable to fetch location.');
    }
  );
});
