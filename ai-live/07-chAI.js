import {checkOpenAI} from "./01-chAi.js"

const client = await checkOpenAI();

const model = "gpt-4o-mini";

console.log(client.baseURL)

const stream = await client.chat.completions.create({
    model,
    messages: [
        { role: "system", content: "You are a chatbot and you always repond in 1 line" },
        { role: "user", content: "Who is largest organism ?" }
    ],
    stream: true
})

console.log("=========================")
console.log(stream)
console.log("=========================")

let lastChunk = null
for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content
    if (delta) {
        process.stdout.write(delta)
    }
    lastChunk += chunk
}