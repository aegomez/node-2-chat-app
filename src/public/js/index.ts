var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message: chatApp.Message) {
  console.log('New message:', message);
  var li = document.createElement('li');
  li.textContent = message.from + ': ' + message.text;
  $('#message-list').appendChild(li);
});

$('#message-form').addEventListener('submit', function(event) {
  event.preventDefault();
  socket.emit(
    'createMessage',
    {
      from: 'Anon',
      text: ($('[name=message]') as HTMLInputElement).value
    } as chatApp.Message,
    function(data: string) {
      console.log('Got it', data);
    }
  );
})
