const ChatRoom = require('./ChatRoom')

const chat = new ChatRoom()

chat.on('join', (user) => {
    console.log(`${user} has joined the chat`)
})

chat.on('message', (user, message) => {
    console.log(`${user} : ${message}`)
})

chat.on('leave', (user) => {
    console.log(`${user} has left the chat`)
})

// simulating a chat

chat.join('Alice')
chat.join('Bob')

chat.sendMessage('Alice', 'hey bob, Hello to everyone')
chat.sendMessage('bob', 'hey Alice, Hello to everyone')

chat.leave('Alice')
chat.sendMessage('Alice', 'this message wont be sent')
chat.leave('bob')
