import {checkOpenAI} from "./01-chAi.js"
import readline from "readline";

const client = await checkOpenAI();

const model = "gpt-4o-mini";

console.log(client.baseURL)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const systemPrompt = "You are a helpful assistant and you always repond in 5 line"

function askQuestion(userPrompt) {
    return new Promise((resolve, reject) => {
        rl.question(userPrompt, (answer) => {
            resolve(answer)
        })
    })
}

while (true) {
    const userPrompt = await askQuestion("You: ")
    if (userPrompt === "exit") {
        console.log("Goodbye!")
        // process.exit(0)
        break
    }
    const stream = await client.chat.completions.create({
        model,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
        stream: true
    })

    process.stdout.write("Chai Bot: ")
    for await (const message of stream) {
        const delta = message.choices[0]?.delta?.content
        if (delta) {
            process.stdout.write(delta)
        }
    }
    console.log("\n")
}

rl.close()