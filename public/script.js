const socket = io()

var messages = document.getElementById('messages')

function renderMessage(message) {
  var node = document.createElement('div')
  node.innerHTML = '<strong>' + message.author + '</strong>: ' + message.message

  messages.appendChild(node)
}

socket.on('previousMessages', function (messages) {
  for (message of messages) {
    renderMessage(message)
  }
})

socket.on('receivedMessage', function (message) {
  renderMessage(message)
})

/**
 * Function to send a new message
 */

var form = document.getElementById('chat')
var formInputs = form.elements

form.addEventListener('submit', function (event) {
  event.preventDefault()

  var author = formInputs['username'].value
  var message = formInputs['message'].value

  if (author.length && message.length) {
    var messageObject = {
      author: author,
      message: message,
    }

    /**
     * Rendering message sended on frontend
     */

    renderMessage(messageObject)

    /**
     * Creating a new event to send something
     * to backend side with websockets
     */

    socket.emit('sendMessage', messageObject)

    /**
     * Clears message value
     */

    formInputs['message'].value = ''
  }
})
