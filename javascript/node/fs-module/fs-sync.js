import fs from "node:fs";

// 1. Write

// fs.writeFileSync("test.txt", "Hello from sync fs!")

// 2. Append

// fs.appendFileSync("test.txt", "Hello from append data!")

// 3. Read
// const data = fs.readFileSync("test.txt", "utf-8")

// console.log(data)

// create directory
// fs.mkdirSync("myfolder")
// fs.mkdirSync("myfolder/innerfolder", {recursive: true})

// remove directory
// fs.rmdirSync("myfolder")
// fs.rmSync("myfolder", {recursive: true, force: true})

// unlink/delete file
// fs.unlinkSync("test.txt")

// rename file
// fs.renameSync("test.txt", "renamed-test.txt")

// copy file
// fs.cpSync('renamed-test.txt', "cp-test.txt")