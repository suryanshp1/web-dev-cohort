import {checkOpenAI} from "./01-chAi.js"

const client = await checkOpenAI();

const model = "gpt-4o-mini";

console.log(client.baseURL)

const conversation = []

async function askQuestion(systemPrompt, UserPrompt, history = []) {
    const response = await client.chat.completions.create(
        {
            model,
            messages: [
                { role: "system", content: systemPrompt },
                ...history,
                { role: "user", content: UserPrompt }
            ]
        }
    )
    history.push({ role: "user", content: UserPrompt })
    history.push({ role: "assistant", content: response.choices[0].message.content })
    return response.choices[0].message.content
}

const userQuestion = "My name is Suryansh and I am a aspiring Software Engineer, tell me 1 line joke"

const response1 = await askQuestion("You always repond in 1 line", userQuestion, conversation)
console.log(response1)

const response2 = await askQuestion("You always repond in 1 line", "tell me my name", conversation)
console.log(response2)
