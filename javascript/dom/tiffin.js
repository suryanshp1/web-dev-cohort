const obj = {
    listeners: [],
    addEventListener(cb) {
        this.listeners.push(cb)
    }
}

obj.addEventListener(function() {
    
})