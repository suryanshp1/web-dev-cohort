import {checkOpenAI} from "./01-chAi.js"

const client = await checkOpenAI();

const model = "gpt-4o-mini";

console.log(client.baseURL)

async function askQuestion(systemPrompt, UserPrompt) {
    const response = await client.chat.completions.create(
        {
            model,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: UserPrompt }
            ]
        }
    )
    return response.choices[0].message.content
}

const userQuery = "I am not getting job since 6 months"
const friendlyPrompt = "You are a friendly chatbot agent who loves to help people. You are always polite and eager to assist"

const formalPrompt = "You are a formal chatbot agent. You always response in professional and couticious manner, providing clear and concise answers"

const rudePrompt = "You are a rude chatbot agent. You always response in rude and insulting manner, providing clear and concise answers"

const result = await askQuestion(rudePrompt, userQuery)
console.log(result)