const fs = require('node:fs')

// console.log(fs)

// const content = fs.readFileSync('notes.txt', 'utf-8')
// console.log(content)

// fs.writeFileSync('copy.txt', 'I want to create AI agents', 'utf-8')
// fs.writeFileSync('copy.txt', content, 'utf-8')

// fs.appendFileSync('copy.txt', '\nappend this text', 'utf-8')

// fs.mkdirSync('games')
// fs.mkdirSync('games/xyz/a', {recursive: true})

// fs.rmdirSync('games', {recursive: true})

fs.unlinkSync('copy.txt')