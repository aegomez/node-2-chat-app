var socket = io();

function scrollToBottom() {
  var messages = $("#message-list");
  var newMessage = messages.lastElementChild as Element;
  
  var clientHeight = messages.clientHeight;
  var scrollTop = messages.scrollTop;
  var scrollHeight = messages.scrollHeight;
  var newMessageHeight = newMessage.clientHeight;
  var lastMessageHeight = newMessage.previousElementSibling ? newMessage.previousElementSibling.clientHeight : 0;

  if ((clientHeight + scrollTop + newMessageHeight + lastMessageHeight) >= scrollHeight) {
    messages.scrollTop = scrollHeight;
  }
}

socket.on('connect', function() {
  var params: chatApp.SearchParams = deparam(window.location.search);
  socket.emit('join', params, function(err?: string) {
    if (err) {
      alert(err);
      window.location.href = '/';
    }
    else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message: chatApp.DatedMessage) {
  var time = moment(message.date).format('h:mm a');
  var template = $('#message-template').innerHTML;
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    time: time
  });
  $('#message-list').innerHTML += html;
  scrollToBottom();
});

socket.on('newLocationMessage', function(message: chatApp.LocationMessage) {
  var time = moment(message.date).format('h:mm a');
  var template = $('#location-message-template').innerHTML;
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    time: time
  });
  $('#message-list').innerHTML += html;
  scrollToBottom();
});

$('#message-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var messageTextbox = $('[name=message]') as HTMLInputElement;

  var message: chatApp.Message = {
    from: 'Anon',
    text: messageTextbox.value
  };

  socket.emit('createMessage', message, function() {
    messageTextbox.value = '';
  });
});

var locationButton = $('#send-location');

locationButton.addEventListener('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.setAttribute('disabled', 'disabled');
  locationButton.textContent = 'Sending location...';

  navigator.geolocation.getCurrentPosition(
    function success(position) {
      var location: chatApp.Location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      socket.emit('createLocationMessage', location);
      locationButton.removeAttribute('disabled');
      locationButton.textContent = 'Share my location';
    },
    function error() {
      locationButton.removeAttribute('disabled');
      locationButton.textContent = 'Share my location';
      alert('Unable to fetch location.');
    }
  );
});
