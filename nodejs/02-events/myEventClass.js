const EventEmitter = require('events')

class Chat extends EventEmitter {
    sendMessage(msg) {
        console.log(`Message Sent : ${msg}`)
        this.emit('messageReceived', msg)
    }
}

const chat = new Chat()
chat.on("messageReceived", (msg) => {
    console.log(`New message : ${msg}`)
});

// trigger event
chat.sendMessage("Hello Surya there")