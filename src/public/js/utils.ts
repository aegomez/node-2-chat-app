function $(query: string, context?: Element) {
  if (/^#\S+$/.test(query)) {
    return document.getElementById(query.replace('#', '')) as Element;
  }
  return (context || document).querySelector(query) as Element;
};

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