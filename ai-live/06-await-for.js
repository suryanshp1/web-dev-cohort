const stream = {
    count: 0,
    async next() {
        this.count++
        if (this.count > 5) {
            return {done: true}
        }

        return {
            value: `Chunk ${this.count}`,
            done: false
        }
    },
    [Symbol.asyncIterator]() {
        return this
    }
}

for await (const chunk of stream) {
    console.log(chunk)
}