const fs = require('node:fs')


console.log('Start of the script')

// [SYNC] : Blocking operations
// const contents = fs.readFileSync('notes.txt', 'utf-8')

// console.log('Contents : ', contents)

// [ASYNC]: Non blocking
fs.readFile('notes.txt', 'utf-8', function(error, data) {
    if (error) console.log(error)
    
    console.log('Contents : ', data)
})

console.log('End of script')
