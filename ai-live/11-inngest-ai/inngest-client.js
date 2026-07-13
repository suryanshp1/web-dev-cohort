import { Inngest } from 'inngest'
import {openaiResponses} from '@inngest/ai/models'
import dotenv from "dotenv";

dotenv.config();


export const inngest = new Inngest({
    id: 'inngest-ai',
    isDev: (process.env.INNGEST_DEV === "1") ? true : false,
})

export const gpt4omini = openaiResponses({
    model: 'gpt-4o-mini',
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.5,
    maxTokens: 100
})