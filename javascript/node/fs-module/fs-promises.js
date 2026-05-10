import fs from "node:fs/promises"

try {
    const data = await fs.readFile("promise.txt", "utf-8")
    console.log(data)
} catch (error) {
    console.log(error)
}