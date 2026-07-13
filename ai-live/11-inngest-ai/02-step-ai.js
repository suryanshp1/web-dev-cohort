import { inngest, gpt4omini } from "./inngest-client.js";

export const summarizeThenTranslate = inngest.createFunction({
    id: "summarize-then-translate",
    retries: 3,
    triggers: [
        {
            event: "test.summarize-then-translate",
        }
    ]
    },
    async ({event, step}) => {
        const sum = await step.ai.infer("summarize", {
            model: gpt4omini,
            body: {
                input: [
                    {
                        role: "user",
                        content: `Summarize this text in 1 line: ${event.data.text}`
                    }
                ]
            }
        });

        const summary = sum.output[0].content[0].text

        const tr = await step.ai.infer("translate", {
            model: gpt4omini,
            body: {
                input: [
                    {
                        role: "user",
                        content: `Translate this text to Bhojpuri: ${summary}`
                    }
                ]
            }
        });

        const translation = tr.output[0].content[0].text;

        return {
            summary,
            translation
        }
    }
)