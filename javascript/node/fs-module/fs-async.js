import fs from "node:fs";
// import util from "util"

// fs.writeFile("async.txt", "Hello async file ops!", (err) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log("File written successfully")
// })

// calback approach - old
// fs.readFile("async.txt", "utf8", (err, data) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log(data)
// })

// promises approach - async/await - new
// const readFile = util.promisify(fs.readFile)
// const data = await readFile("async.txt", "utf8")
// console.log(data)

// callback hell
fs.readFile("a.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err)
    }
    fs.writeFile("b.txt", data, (err) => {
        if (err) {
            console.log(err)
        }
        fs.unlink('a.txt', (err) => {
            if (err) {
                console.log(err)
            }
            console.log("unlink Operation done")
        })
    })
})