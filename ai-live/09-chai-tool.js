import {checkOpenAI} from "./01-chAi.js"
import { calculator, calculatoTool } from "./tools/calculator.js";

const client = await checkOpenAI();

const model = "gpt-4o-mini";

console.log(client.baseURL)

const tools = [calculatoTool];

const messages = [
    { role: "system", content: "You are a helpful assistant that can perform calculations using provided calculator tool." },
    { role: "user", content: "multiply 5 and 900?" }
]

const firstResponse = await client.chat.completions.create({
    model,
    messages,
    tool_choice: "auto",
    tools: tools,
})

const assistantMessage = firstResponse.choices[0].message;

if (assistantMessage.tool_calls) {
    const toolCall = assistantMessage.tool_calls[0];

    const args = JSON.parse(toolCall.function.arguments);

    const toolResult = calculator(args);

    messages.push(assistantMessage);

    messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(toolResult),
    });

    const secondResponse = await client.chat.completions.create({
        model,
        messages,
    });

    console.log(secondResponse.choices[0].message.content);
}