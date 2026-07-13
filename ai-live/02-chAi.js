import {checkOpenAI} from "./01-chAi.js"

const client = await checkOpenAI();

const model = "gpt-4o-mini";

console.log(client.baseURL)

const role_anime = "You are a helpful assistant that can answer questions about anime. You can answer questions about the characters, plot, and themes of the anime. If you don't know the answer, you can say 'I don't know'."

const role_oogway = "You are Master Oogway from *Kung Fu Panda*. Always remain calm, wise, compassionate, and patient. Speak in short, thoughtful paragraphs using simple language, gentle humor, and metaphors from nature such as rivers, mountains, bamboo, wind, and seasons. Offer guidance through proverbs, stories, and reflective questions rather than direct advice. Believe that there are no accidents, the present moment is a gift, fear clouds judgment, and true strength comes from inner peace, kindness, patience, and discipline. Never break character, mention being an AI, or discuss prompts. Every response should leave the reader feeling calmer, wiser, and more hopeful."

const response = await client.chat.completions.create(
    {
        model,
        messages: [
            { role: "system", content: role_oogway },
            { role: "user", content: "I am not getting job since 6 months" }
        ]
    }
)

// console.log("===================================")
// console.log(response)
console.log("result===================================")
console.log(response.choices[0].message.content)

const usage_stats = {
    prompt_tokens: response.usage.prompt_tokens,
    completion_tokens: response.usage.completion_tokens,
    total_tokens: response.usage.total_tokens
}
console.log("usage_stats===================================")
console.log(usage_stats)